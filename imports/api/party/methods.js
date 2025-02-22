import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import Party from "./party";
import Song from "../song/song";
import SongParty from "../songParty/songParty";

Meteor.methods({
  "party.create"({ name }) {
    console.log("party.create");
    const user = Meteor.users.findOne(this.userId);
    const song = Meteor.call(
      "song.createFromUrl",
      "https://www.youtube.com/watch?v=PW-hCYPFpKM"
    );
    const party = {
      creator: user.username,
      name,
      currentSong: song,
      songs: [song],
      toPlay: [],
      played: [],
      burds: [user.username],
    };
    return Party.insert(party);
  },

  "party.addSong"(song, partyId) {
    console.log("party.addSong");
    check(song, String);
    check(partyId, String);
    const songId = Song.insert(song);
    const party = Party.findOne(partyId);
    if (songId === party.currentSong || party.songs.indexOf(songId) !== -1) {
      return 0;
    }
    return Party.update(
      { _id: partyId },
      {
        $addToSet: {
          songs: songId,
          toPlay: songId,
        },
      }
    );
  },

  "party.addSongFromUrl"(url, partyId) {
    console.log("party.addSongFromUrl");
    check(url, String);
    check(partyId, String);
    const songId = Meteor.call("song.createFromUrl", url);
    const party = Party.findOne(partyId);
    if (songId === party.currentSong || party.songs.indexOf(songId) !== -1) {
      return 0;
    }
    return Party.update(
      { _id: partyId },
      {
        $addToSet: {
          songs: songId,
          toPlay: songId,
        },
      }
    );
  },

  "party.addSongFromSearch"(song, partyId) {
    console.log("party.addSongFromSearch");
    check(song, Object);
    check(partyId, String);
    console.log(song);
    const songToCreate = Object.assign({}, song.snippet, {
      id: song.id.videoId,
      owner: this.userId,
    });
    const songId = SongParty.insert(songToCreate);
    const party = Party.findOne(partyId);
    if (songId === party.currentSong || party.songs.indexOf(songId) !== -1) {
      return 0;
    }
    return Party.update(
      { _id: partyId },
      {
        $addToSet: {
          songs: songId,
          toPlay: songId,
        },
      }
    );
  },

  "party.nextSong"(partyId) {
    console.log("party.nextSong");
    check(partyId, String);
    const party = Party.findOne(partyId);
    console.log(party);
    if (!party.toPlay.length) return 0;
    const nextSong = party.toPlay
      .map(id => SongParty.findOne(id))
      .sort((a, b) => a.votes.length < b.votes.length)
      .map(song => song._id)[0];
    return Party.update(partyId, {
      $set: { currentSong: nextSong },
      $pull: { toPlay: nextSong },
      $push: { played: party.currentSong },
    });
  },

  "party.previousSong"(partyId) {
    console.log("party.previousSong");
    check(partyId, String);
    const party = Party.findOne(partyId);
    if (!party.played.length) return 0;
    return Party.update(partyId, {
      $set: { currentSong: party.played[party.played.length - 1] },
      $pop: { played: 1 },
      $push: { toPlay: party.currentSong },
    });
  },

  "party.addBurd"(slug) {
    console.log("party.addBurd");
    check(slug, String);
    const user = Meteor.users.findOne(this.userId);
    const profile = user.profile;
    profile.currentParty = slug;
    Meteor.users.update(this.userId, {
      $set: { profile },
    });
    return Party.update(
      { slug },
      {
        $addToSet: { burds: user.username },
      }
    );
  },

  "party.removeBurd"() {
    console.log("party.removeBurd");
    if (!this.userId) {
      return "disconnected";
    }
    const user = Meteor.users.findOne(this.userId);
    console.log(user);
    const profile = user.profile;
    Party.update(
      { slug: profile.currentParty },
      {
        $pop: { burds: user.username },
      }
    );
    profile.currentParty = "";
    return Meteor.users.update(this.userId, {
      $set: { profile },
    });
  },
});
