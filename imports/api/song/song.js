import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http'

export const isYtUrl = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
const youtubeurl = 'https://www.googleapis.com/youtube/v3/videos'

const songSchema = new SimpleSchema({
  id: {
    type: String,
    optional: false,
  },
  name: {
    type: String,
    optional: true,
  },
  burd_id: {
    type: String,
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    optional: false,
  },
});

class SongCollection extends Mongo.Collection {
  insert(url , callback) {
    const ourDoc = {};
    const str = url;
    const intIndex = str.indexOf("v=") !== -1 ? str.indexOf("v=") + 2 : str.indexOf("be/") + 3;
    const strVideoId = str.substring(intIndex, intIndex + 11);
    ourDoc.createdAt = new Date();
    ourDoc.id = strVideoId
    try {
      const res = HTTP.get(`${youtubeurl}?part=snippet&id=${strVideoId}&key=${Meteor.settings.YOUTUBEAPI}`)
      const yt = res.data.items[0].snippet
      console.log(yt)
      ourDoc.name = yt.title
      ourDoc.image = yt.thumbnails.high ? yt.thumbnails.high.url : yt.thumbnails.default.url
      console.log(ourDoc)
      check(ourDoc, songSchema);
      const result = super.insert(ourDoc, callback);
      return result;
    } catch (e) {
      throw e;
    }
  }
}

const Song = new SongCollection('songs');

export default Song;
