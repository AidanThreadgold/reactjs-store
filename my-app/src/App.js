import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import ProductListing from './atomic/pages/ProductListing';
import ProductPage from './atomic/pages/ProductPage';
import CartPage from './atomic/pages/CartPage';


class App extends Component {
  render() {
      return (
          <Router>
              <div>
                <Route exact path="/" component={ProductListing}/>
                  <Route path="/product-page/" component={ProductPage}/>
                  <Route path="/cart/" component={CartPage}/>
              </div>
          </Router>
      );
  }
}

export default App;