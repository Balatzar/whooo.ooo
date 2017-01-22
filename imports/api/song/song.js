import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';

const regex = new RegExp("^(<https\\:\\/\\/)?(www\\.youtube\\.com|youtu\\.?be)\\/.+$");

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
  createdAt: {
    type: Date,
    optional: false,
  },
});

class SongCollection extends Mongo.Collection {
  insert({ url }, callback) {
    const ourDoc = {};
    const str = url;
    const intIndex = str.indexOf("v=") !== -1 ? str.indexOf("v=") + 2 : str.indexOf("be/") + 3;
    const strVideoId = str.substring(intIndex, intIndex + 11);
    ourDoc.createdAt = new Date();
    ourDoc.id = strVideoId
    try {
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
