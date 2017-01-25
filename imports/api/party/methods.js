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

  'party.addSong'(url, partyId) {
    const song = Song.insert(url)
    const party = Party.findOne(partyId)
    if (song === party.currentSong || party.songs.indexOf(song) !== -1) {
      return 0
    }
    return Party.update({ _id: partyId }, {
      $addToSet: {
        songs: song,
        toPlay: song,
      }
    })
  },

  'party.nextSong'(partyId) {
    const party = Party.findOne(partyId)
    if (!party.toPlay.length) return
    return Party.update(partyId, {
      $set: { currentSong: party.toPlay[0] },
      $pop: { toPlay: -1 },
      $push: { played: party.currentSong }
    })
  },

  'party.previousSong'(partyId) {
    const party = Party.findOne(partyId)
    if (!party.played.length) return
    return Party.update(partyId, {
      $set: { currentSong: party.played[party.played.length - 1] },
      $pop: { played: 1 },
      $push: { toPlay: party.currentSong }
    })
  },

  'party.addBurd'(burd, partyId) {
    return Party.update(partyId, {
      $push: { burds: burd }
    })
  },

  'party.removeBurd'(burd, partyId) {
    return Party.update(partyId, {
      $pop: { burds: burd }
    })
  },

  'party.start'(partyId) {
    return Party.update(partyId, {
      $set: { started: true }
    })
  }
});
