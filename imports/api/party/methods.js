import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Party from './party'
import Song from '../song/song'

Meteor.methods({
  'party.create'({ creator, name, url }) {
    const song = Song.insert(url)
    const party = {
      creator,
      name,
      currentSong: song,
      songs: [song],
      toPlay: [],
      played: [],
      burds: [creator]
    }
    const result = Party.insert(party)
    return result
  },

  'party.addSong'(url, playlistId) {
    const song = Song.insert(url)
    return Party.update({ _id: playlistId }, {
      $push: {
        songs: song,
        toPlay: song,
      }
    })
  },

  'party.nextSong'(playlistId) {
    const party = findOne(playlistId)
    return Party.update(playlistId, {
      $set: { currentSong: party.toPlay[0] },
      $pop: { toPlay: -1 },
      $push: { played: party.currentSong }
    })
  }
});
