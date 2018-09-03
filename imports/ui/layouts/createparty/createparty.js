import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";

import "./createparty.css";
import "./createparty.html";

Template.createparty.events({
  "submit form"(event) {
    event.preventDefault();
    const name = event.target.name.value;
    if (!name) {
      return;
    }
    Meteor.call(
      "party.create",
      {
        name,
      },
      (err, res) => {
        if (err) {
          console.warn(err);
        } else {
          FlowRouter.go(`/party/${res}`);
        }
      }
    );
  },
});
