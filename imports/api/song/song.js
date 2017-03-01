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

class SongCollection extends Mongo.Collection {}

const Song = new SongCollection('songs');

export default Song;
