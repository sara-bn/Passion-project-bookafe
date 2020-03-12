﻿import React, { Component } from 'react';


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

    async showList() {
        const theUser = localStorage.getItem('myuser');

        await fetch('api/lists/' + theUser)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lists: data
                });
            });
    }

    async changeStatus(event) {
        const theUser = localStorage.getItem('myuser');
        var idToChange = event.target.id;
        var title = event.target.getAttribute("value")
        console.log(idToChange)
        console.log(title)
        await fetch("api/lists/" + idToChange, {
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
            .catch(function (error) {
                alert(error);
            });

        this.showList();
    }
    async removeItem(event) {
        var idToRemove = event.target.id;
        await fetch("api/lists/" + idToRemove, {
            method: "DELETE",
        })
        this.setState({
            lists: this.state.lists.filter(book => book.id != idToRemove)
        });

        console.log(this.state.lists);
    }

    render() {
        //const theUser = localStorage.getItem('myuser');
        //const filterdList = this.state.lists.filter(list => list.userEmail==theUser);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const contents = this.state.lists.map((item) =>
            <tr className="tableRow" style={{ backgroundColor: item.isComplete ? "#CCFFFF" : "white" }} key={item.id}  >
                <td> {item.bookTitle} </td>
                <td> {new Date().getDate() + "-" + months[(new Date().getMonth())] + "-" + new Date().getFullYear()} </td>
                {!item.isComplete ? <td>Not Yet</td> : <td>Completed</td>}
                <td> <button style={{ backgroundColor: item.isComplete ? "#CCFFFF" : "white" }} className="changeButton" onClick={this.changeStatus} id={item.id} value={item.bookTitle}><i className='fa fa-check'></i></button> </td>
                <td> <button style={{ backgroundColor: item.isComplete ? "#CCFFFF" : "white" }} className="removeButton" onClick={this.removeItem} id={item.id} > <i className='far fa-trash-alt'></i> </button> </td>
                
            </tr>
        )
        return (
            <div>
                <table class="table table-sm">
                    <tr className="tableHead">
                        <th>Title</th>
                        <th>Date</th>
                        <th>IsComplete</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    {contents}
                </table>
            </div>
        );
    }
}