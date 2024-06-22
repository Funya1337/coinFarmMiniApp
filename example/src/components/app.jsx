import React, { useState, useEffect } from 'react';

import {
  f7,
  f7ready,
  App,
  View,
} from 'framework7-react';


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {


  // Framework7 Parameters
  const f7params = {
    name: 'My App',
      theme: 'ios',
      store: store,
      routes: routes,
  };

  f7ready(() => {

    // Call F7 APIs here
  });

  return (
    <App { ...f7params }>

        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />

    </App>
  );
}
export default MyApp;