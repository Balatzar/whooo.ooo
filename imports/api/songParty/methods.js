import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"

import SongParty from "../songParty/songParty.js"

Meteor.methods({
  "songParty.vote"(_id) {
    check(_id, String)
    const song = SongParty.findOne(_id)
    if (song.votes.indexOf(this.userId) !== -1) {
      return SongParty.update(
        { _id },
        {
          $pull: {
            votes: this.userId,
          },
        }
      )
    }
    return SongParty.update(
      { _id },
      {
        $push: {
          votes: this.userId,
        },
      }
    )
  },
})
