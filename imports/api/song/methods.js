import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Song from './song.js';

const youtubeurl = 'https://www.googleapis.com/youtube/v3'

Meteor.methods({
  'song.create'(song) {
    console.log('song.create')
    return Song.insert(song)
  },

  'song.createFromUrl'(url) {
    const str = url;
    const intIndex = str.indexOf("v=") !== -1 ? str.indexOf("v=") + 2 : str.indexOf("be/") + 3;
    const id = str.substring(intIndex, intIndex + 11);
    const song = Song.findOne({ id })
    console.log(song)
    if (song) {
      return song._id;
    }
    try {
      const url = `${youtubeurl}/videos?part=snippet&id=${id}&key=${Meteor.settings.YOUTUBEAPI}`
      console.log(url)
      const res = HTTP.get(url)
      const yt = res.data.items[0].snippet
      console.log(yt)
      const result = Song.insert(yt);
      return result;
    } catch (e) {
      throw e;
    }
  },

  'song.search'(query) {
    try {
      const res = HTTP.get(`${youtubeurl}/search?part=snippet&q=${query}&videoEmbeddable=true&type=video&key=${Meteor.settings.YOUTUBEAPI}`)
      const results = res.data
      return results;
    } catch (e) {
      throw e;
    }
  },

  'song.searchNext'(query, nextPageToken) {
    const url = `${youtubeurl}/search?part=snippet&q=${query}&pageToken=${nextPageToken}&videoEmbeddable=true&type=video&key=${Meteor.settings.YOUTUBEAPI}`
    console.log(url)
    try {
      const res = HTTP.get(url)
      const results = res.data
      return results;
    } catch (e) {
      throw e;
    }
  },

  'song.searchPrevious'(query, prevPageToken) {
    const url = `${youtubeurl}/search?part=snippet&q=${query}&pageToken=${prevPageToken}&videoEmbeddable=true&type=video&key=${Meteor.settings.YOUTUBEAPI}`
    console.log(url)
    try {
      const res = HTTP.get(url)
      const results = res.data
      return results;
    } catch (e) {
      throw e;
    }
  },
});
