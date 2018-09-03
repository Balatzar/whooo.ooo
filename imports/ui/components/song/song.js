import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";

import "./song.html";
import "./song.css";

Template.song.events({
  "click .js-vote"() {
    Meteor.call("songParty.vote", this._id, (err, res) => {
      if (err) {
        console.warn(err);
      } else {
        console.log(res);
      }
    });
  },
});
