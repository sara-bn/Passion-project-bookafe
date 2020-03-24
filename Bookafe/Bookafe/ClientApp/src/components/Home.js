import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <div className="wrapper">
              <div className="main">
                  <h1> How Many Books Do You Want to Read This Year?</h1>
                  <br/>
                  <h4> We are here to help you!</h4>
                  <br/>
                  <p> Search through hundreds of thousands of books, find a shoert description and make some choices and make you own list</p>     
              </div>
       </div>
    );
  }
}
