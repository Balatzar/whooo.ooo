import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { YT } from 'meteor/adrianliaw:youtube-iframe-api'

import './youtubeplayer.html';
import './youtubeplayer.css';

var time_update_interval = 0

Template.youtubeplayer.onRendered(() => {
  onYouTubeIframeAPIReady = () => {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'SSbBvKaM6sk',
        events: {
            onReady: initialize,
            onStateChange: onStateChange,
        }
    });
  }

  function onStateChange(state) {
    // video has ended
    if (!state.data) {
      player.cueVideoById('1oJEBGHCdBQ')
    }
  }

  function initialize(){

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
      console.log(player.getCurrentTime())
      $('#current-time').text(formatTime( player.getCurrentTime() ));
      $('#duration').text(formatTime( player.getDuration() ));
  }


  // This function is called by initialize()
  function updateProgressBar(){
      // Update the value of our progress bar accordingly.
      $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
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
