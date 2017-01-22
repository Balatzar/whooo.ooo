import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { YT } from 'meteor/adrianliaw:youtube-iframe-api'

import Party from '../../../api/party/party'
import Song from '../../../api/song/song'

import './youtubeplayer.html';
import './youtubeplayer.css';

var time_update_interval = 0
var player = undefined

Template.youtubeplayer.onRendered(() => {
  Meteor.subscribe('parties.all')
  Meteor.subscribe('songs.all')
  const playlistId = Template.currentData().playlistId

  onYouTubeIframeAPIReady = () => {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        events: {
            onReady,
            onStateChange,
        },
        playerVars: {
          controls: 0,
        }
    });
  }

  Tracker.autorun(function() {
    const party = Party.findOne(playlistId)
    if (party) {
      var currentSong = Song.findOne(party.currentSong).id
      if (player) {
        player.cueVideoById(currentSong)
      } else {
        const wait = setInterval(() => {
          if (player && player.cueVideoById) {
            player.cueVideoById(currentSong)
            clearInterval(wait)
          }
        }, 100)
      }
    }
  });

  function onStateChange(state) {
    // video has ended
    if (!state.data) {
      Meteor.call('party.endSong', playlistId, (err, res) => {
        if (err) {
          console.warn(err)
        } else {
          console.log(res)
        }
      })
    }
  }

  function onReady() {

      // Clear any old interval.
      clearInterval(time_update_interval);

      // Start interval to update elapsed time display and
      // the elapsed part of the progress bar every second.
      time_update_interval = setInterval(function () {
          updateTimerDisplay();
          updateProgressBar();
      }, 1000);


      $('#progress-bar').on('mouseup touchend', function (e) {

          // Calculate the new time for the video.
          // new time in seconds = total duration in seconds * ( value of range input / 100 )
          var newTime = player.getDuration() * (e.target.value / 100);

          // Skip video to new time.
          player.seekTo(newTime);
          player.playVideo();

      });
  }


  // This function is called by initialize()
  function updateTimerDisplay(){
      // Update current time text display.
      $('#current-time').text(formatTime( player.getCurrentTime() ));
      $('#duration').text(formatTime( player.getDuration() ));
  }


  // This function is called by initialize()
  function updateProgressBar(){
      // Update the value of our progress bar accordingly.
      $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
  }
})

Template.youtubeplayer.helpers({
  getName() {
    const party = Party.findOne(Template.currentData().playlistId)
    return party ? party.name : ''
  },

  getUsername() {
    return Session.get('username')
  },

  nbBurds() {
    const party = Party.findOne(Template.currentData().playlistId)
    return party ? party.burds.length : ''
  },

  remaining() {
    const party = Party.findOne(Template.currentData().playlistId)
    return party ? (party.toPlay.length ? `Il reste ${party.toPlay.length} chansons` : "Il n'y a aucune chanson restante apres celle-ci") : ''
  }
})

Template.youtubeplayer.events({
  "click #play"() {
    player.playVideo();
  },
  "click #pause"() {
    player.pauseVideo();
  }
})

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}
