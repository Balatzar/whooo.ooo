import { Mongo } from "meteor/mongo";

class SongPartyCollection extends Mongo.Collection {
  insert(doc, callback) {
    console.log("create SongParty");
    const ourDoc = doc;
    delete ourDoc._id;
    ourDoc.createdAt = new Date();
    ourDoc.votes = [ourDoc.owner];
    console.log(ourDoc);
    try {
      return super.insert(ourDoc, callback);
    } catch (e) {
      throw e;
    }
  }
}

const SongParty = new SongPartyCollection("songparties");

export default SongParty;
