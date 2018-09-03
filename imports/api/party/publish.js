import { Meteor } from "meteor/meteor";
import Party from "./party";

Meteor.publish("parties.all", () => Party.find({}));
