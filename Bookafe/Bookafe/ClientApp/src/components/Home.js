import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
      <div className="wrapper">
             <h1> How Many Books Do You Want to Read This Year?</h1>
             <h4> We are here to help you!</h4>
             <p> Search through hundreds of thousands of books, find a shoert description and make some choices and make you own list</p>     
       </div>
    );
  }
}
