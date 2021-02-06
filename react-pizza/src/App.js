import React from 'react';
 import axios from 'axios';
 

 import { Header } from './Components';
 import {Home, Cart} from './pages/index.js';
 import { Route } from 'react-router-dom';
 

 
 
 function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
      </div>
      </div>
   );
 }

  



 export default App;
   
 /* export default connect(
    (state) => {
      return {
        items: state.pizzas.items,
        filters: state.filters,
      };
    },
    (dispatch) => {
      return {
        setPizzas: (items) => dispatch(setPizzas(items)),
      };
    },
  )(App);
  */