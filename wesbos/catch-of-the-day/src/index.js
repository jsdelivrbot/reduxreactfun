// let's go!
import React from 'react';
import { render } from 'react-dom'; //if its JUST a string, webpack thinks you look in nodemodules directory.

//router
import {BrowserRouter, Match, Miss} from 'react-router';

//components
import StorePicker from './components/storepicker';
import App from './components/app';
import NotFound from './components/notFound';

//style sheet
import './css/style.css';


//routing: we imported Match, and this allows us to specify a path pattern and define the component which should render if it matches. These have to always be wrapped in a div.
//
//Miss: if you pass in a variable, number or booelan (not a string), it needs to be in curly brackets. Here we are putting in a notFound component...at this time I havent created a notFound component but will do so next -
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker}/>
        <Match pattern="/store/:storeId" component={App}/>
        <Miss component={NotFound}/>
      </div>
    </BrowserRouter>
  )
}


// render (<StorePicker/>, document.querySelector('#main'));
// render (<App/>, document.querySelector('#main'));
//
// this renders the Root, which inadvertantly renders App if the pattern matches
render (<Root/>, document.querySelector('#main'));
