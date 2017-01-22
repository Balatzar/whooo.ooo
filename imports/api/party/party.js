import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';

const partySchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  creator: {
    type: String,
    optional: false,
  },
  currentSong: {
    type: String,
    optional: false,
  },
  songs: {
    type: [String],
    optional: false,
  },
  toPlay: {
    type: [String],
    optional: false,
  },
  played: {
    type: [String],
    optional: false,
  },
  burds: {
    type: [String],
    optional: false,
  },
  createdAt: {
    type: Date,
    optional: false,
  },
  started: {
    type: Boolean,
    optional: false,
  }
});

class PartyCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = new Date();
    ourDoc.started = false
    console.log(ourDoc)
    try {
      check(ourDoc, partySchema);
      const result = super.insert(ourDoc, callback);
      return result;
    } catch (e) {
      throw e;
    }
  }
}

const Party = new PartyCollection('parties');

export default Party;
