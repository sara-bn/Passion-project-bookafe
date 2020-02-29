import React, { Component } from 'react';

    export class List extends Component {
        constructor() {
            super();
            this.state = {
                lists:[]
            };
            this.changeStatus = this.changeStatus.bind(this);

            fetch('api/lists')
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        lists: data
                    });
                });
            }

            changeStatus(event) {
               var idToChange = event.target.value;
              console.log(idToChange)
                fetch("api/lists/"+idToChange, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: 10 ,
                        bookTitle: "Harry: A Biography of a Prince",
                        isComplete: false,
                    }
                    )
                })
                    .then(response => response.json())
                    .then(json => console.log(json))                  
                  }

               render() {

                return (
                    <div>
                       <table class="table table-sm table-dark">
                            <tr><th>Title</th><th></th><th>IsComplete</th><th>UserEmail</th></tr>
                            {
                                this.state.lists.map((item) =>
                                    <tr key={item.id}  >
                                        <td> {item.bookTitle} </td>
                                        <td> <button onClick={this.changeStatus} value={item.id}> Completed </button> </td>
                                        <td> {item.isComplete}  </td>
                                        <td> {item.userEmail} </td>
                                    </tr>
                                )}
                        </table>
                     </div>
            );
         }
       }
