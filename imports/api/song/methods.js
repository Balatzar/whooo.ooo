import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Song from './song.js';

const youtubeurl = 'https://www.googleapis.com/youtube/v3'

Meteor.methods({
  'song.create'(url) {
    console.log('song.create')
    const result = Song.insert(url)
    return result
  },

  'song.search'(query) {
    try {
      const res = HTTP.get(`${youtubeurl}/search?part=snippet&q=${query}&videoEmbeddable=true&type=video&key=${Meteor.settings.YOUTUBEAPI}`)
      const results = res.data.items
      return results;
    } catch (e) {
      throw e;
    }
  }
});
