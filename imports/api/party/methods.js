import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Party from './party'
import Song from '../song/song'

Meteor.methods({
  'party.create'({ name, url }) {
    console.log('party.create')
    const user = Meteor.users.findOne(this.userId)
    const song = Meteor.call('song.createFromUrl', url)
    const party = {
      creator: user.username,
      name,
      currentSong: song,
      songs: [song],
      toPlay: [],
      played: [],
      burds: [user.username]
    }
    return Party.insert(party)
  },

  'party.addSong'(song, partyId) {
    console.log('party.addSong')
    const songId = Song.insert(song)
    const party = Party.findOne(partyId)
    if (songId === party.currentSong || party.songs.indexOf(songId) !== -1) {
      return 0
    }
    return Party.update({ _id: partyId }, {
      $addToSet: {
        songs: songId,
        toPlay: songId,
      }
    })
  },

  'party.addSongFromUrl'(url, partyId) {
    console.log('party.addSong')
    const songId = Meteor.call('song.createFromUrl', url)
    const party = Party.findOne(partyId)
    if (songId === party.currentSong || party.songs.indexOf(songId) !== -1) {
      return 0
    }
    return Party.update({ _id: partyId }, {
      $addToSet: {
        songs: songId,
        toPlay: songId,
      }
    })
  },

  'party.addSongFromSearch'(song, partyId) {
    console.log('party.addSongFromSearch')
    console.log(song)
    const songToCreate = Object.assign({}, song.snippet, { id: song.id.videoId })
    const songId = Song.insert(songToCreate)
    const party = Party.findOne(partyId)
    if (songId === party.currentSong || party.songs.indexOf(songId) !== -1) {
      return 0
    }
    return Party.update({ _id: partyId }, {
      $addToSet: {
        songs: songId,
        toPlay: songId,
      }
    })
  },

  'party.nextSong'(partyId) {
    console.log('party.nextSong')
    const party = Party.findOne(partyId)
    if (!party.toPlay.length) return
    return Party.update(partyId, {
      $set: { currentSong: party.toPlay[0] },
      $pop: { toPlay: -1 },
      $push: { played: party.currentSong }
    })
  },

  'party.previousSong'(partyId) {
    console.log('party.previousSong')
    const party = Party.findOne(partyId)
    if (!party.played.length) return
    return Party.update(partyId, {
      $set: { currentSong: party.played[party.played.length - 1] },
      $pop: { played: 1 },
      $push: { toPlay: party.currentSong }
    })
  },

  'party.addBurd'(slug) {
    console.log('party.addBurd')
    const user = Meteor.users.findOne(this.userId)
    const profile = user.profile
    profile.currentParty = slug
    Meteor.users.update(this.userId, {
      $set: { profile }
    })
    return Party.update({ slug }, {
      $addToSet: { burds: user.username }
    })
  },

  'party.removeBurd'() {
    console.log('party.removeBurd')
    if (!this.userId) {
      return 'disconnected'
    }
    const user = Meteor.users.findOne(this.userId)
    console.log(user)
    const profile = user.profile
    Party.update({ slug: profile.currentParty }, {
      $pop: { burds: user.username }
    })
    profile.currentParty = ''
    return Meteor.users.update(this.userId, {
      $set: { profile }
    })
  },
});
