import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { $ } from "meteor/jquery";

import "./addSong.html";
import "./addSong.css";

Template.addSong.events({
  "submit .js-addSong"(event) {
    event.preventDefault();
    const input = $(".js-inputUrl");
    Meteor.call(
      "party.addSongFromUrl",
      input.val(),
      Template.currentData().playlistId,
      err => {
        if (err) {
          console.warn(err);
        } else {
          input.val("");
        }
      }
    );
  },
});
