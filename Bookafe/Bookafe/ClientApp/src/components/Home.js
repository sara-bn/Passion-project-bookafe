import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  img from '../img/logo_transparent.png';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <div className="container home">
              <div className="home-logo">
                  <img src={img} alt="app-logo" />
              </div>
              <div className="home-text">
                  <h1> How Many Books Do You Want to Read This Year?</h1>
                  <p>
                      Search through hundreds of thousands of books, read a short description, make some choices and make you own list!
                  </p>
                  <Link className="start-text" to="/search">Get Started</Link>
              </div>
          </div>
    );
  }
}
