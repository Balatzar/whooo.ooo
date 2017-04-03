import '../imports/startup/client';
import './main.css';
import { ATH } from 'add-to-homescreen'

import '../imports/ui/components/header/header'
import '../imports/ui/components/footer/footer'

Template.main.onRendered(() => {
  console.log('hello');
  addToHomescreen({
    displayPace:600, 
  });
})