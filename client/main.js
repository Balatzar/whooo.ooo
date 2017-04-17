import { Template } from "meteor/templating"

import "../imports/startup/client"
import "./main.css"

import "../imports/ui/components/header/header"
import "../imports/ui/components/footer/footer"

Template.main.onRendered(() => {
  addToHomescreen({
    displayPace: 600,
  })
})
