import { Meteor } from "meteor/meteor"
import SongParty from "./songParty.js"

Meteor.publish("songParties.all", () => SongParty.find({}))
