import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Party from './party'
import Song from '../song/song'

Meteor.methods({
  'party.create'({ creator, name, url }) {
    const song = Song.insert({ url })
    const party = {
      creator,
      name,
      songs: [song],
      toPlay: [song],
      played: [],
      burds: [creator]
    }
    const result = Party.insert(party)
    return result
  }
});
