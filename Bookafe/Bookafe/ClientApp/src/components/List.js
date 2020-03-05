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
                        id: 2 ,
                        bookTitle: "",
                        isComplete: true,
                    }
                    )
                })
                    .then(response => response.json())
                    .then(json => console.log(json))                  
                  }

        render() {
                   const contents = this.state.lists.map((item) =>
                       <tr key={item.id}  >
                           <td> {item.bookTitle} </td>
                           <td> <button onClick={this.changeStatus} value={item.id}> Completed </button> </td>
                           {!item.isComplete ? <td>Not Yet</td> : <td>Completed</td>}
                           <td> {item.userEmail} </td>
                       </tr>
                   )
                return (
                    <div>
                       <table class="table table-sm table-dark">
                            <tr><th>Title</th><th></th><th>IsComplete</th><th>UserEmail</th></tr>
                            {contents}
                        </table>
                     </div>
            );
         }
       }
