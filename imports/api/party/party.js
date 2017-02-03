import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
const createSlug = require('slug')
const Chance = require('chance')
const chance = new Chance

const partySchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
  },
  slug: {
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
    ourDoc.slug = createUniqueSlug(doc.name)
    console.log(ourDoc)
    try {
      check(ourDoc, partySchema);
      const result = super.insert(ourDoc, callback);
      return ourDoc.slug;
    } catch (e) {
      throw e;
    }
  }
}

const Party = new PartyCollection('parties');

export default Party;

function createUniqueSlug(name) {
  const slug = `${createSlug(name).toLowerCase()}-${chance.word({ length: 4 })}`
  return Party.findOne({ slug }) ? createUniqueSlug(name) : slug
}
