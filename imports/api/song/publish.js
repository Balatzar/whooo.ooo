import { Meteor } from "meteor/meteor";
import Song from "./song";

Meteor.publish("songs.all", () => Song.find({}));
