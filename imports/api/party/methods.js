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
    return Party.update({ _id: partyId }, {
      $push: {
        songs: song,
        toPlay: song,
      }
    })
  },

  'party.nextSong'(partyId) {
    const party = Party.findOne(partyId)
    return Party.update(partyId, {
      $set: { currentSong: party.toPlay[0] },
      $pop: { toPlay: -1 },
      $push: { played: party.currentSong }
    })
  },

  'party.previousSong'(partyId) {
    const party = Party.findOne(partyId)
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
});
