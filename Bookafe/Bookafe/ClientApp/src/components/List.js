import React, { Component } from 'react';

export class List extends Component {
    constructor() {
        super();
        this.state = {
            lists: []
        };
        this.changeStatus = this.changeStatus.bind(this);
        this.showList = this.showList.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    componentDidMount() {
        this.showList();
    }

    showList() {
        fetch('api/lists')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lists: data
                });
            });
    }

    changeStatus(event) {
        const theUser = localStorage.getItem('myuser');
        var idToChange = event.target.id;
        var title = event.target.getAttribute("value")
        console.log(idToChange)
        console.log(title)
        fetch("api/lists/" + idToChange, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: parseInt(idToChange),
                bookTitle: title,
                isComplete: true,
                userEmail: theUser
            }
            )
        })
            .then(response => response.json())
            .then(json => this.getAll())
            .catch(function (error) {
                alert(error);
            });
    }
    removeItem(event) {
        var idToRemove = event.target.id;
        fetch("api/lists/" + idToRemove, {
            method: "DELETE",
        })
            .then(response => response.json())
    }

    render() {
        const theUser = localStorage.getItem('myuser');
        const filterdList = this.state.lists.filter(list => list.userEmail==theUser);
        const contents = filterdList.map((item) =>
            <tr key={item.id}  >
                <td> {item.bookTitle} </td>
                <td> <button onClick={this.changeStatus} id={item.id} value={item.bookTitle}> Completed </button> </td>
                {!item.isComplete ? <td>Not Yet</td> : <td>Completed</td>}
                <td> <button onClick={this.removeItem} id={item.id} > Remove </button> </td>
            </tr>
        )
        return (
            <div>
                <table class="table table-sm table-dark">
                    <tr><th>Title</th><th></th><th>IsComplete</th><th></th></tr>
                    {contents}
                </table>
            </div>
        );
    }
}