import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";

const checkUser = setInterval(() => {
  if (Meteor.user()) {
    const r = new RegExp("^/party/");
    clearInterval(checkUser);
    if (
      !r.test(FlowRouter.current().path) && Meteor.user().profile.currentParty
    ) {
      Meteor.call("party.removeBurd", (err, res) => {
        if (err) {
          console.warn(err);
        } else {
          console.log(res);
        }
      });
    }
  }
}, 1000);
