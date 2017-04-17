/* eslint-disable no-irregular-whitespace */

import { Mongo } from "meteor/mongo"

export const isYtUrl = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/

class SongCollection extends Mongo.Collection {}

const Song = new SongCollection("songs")

export default Song
