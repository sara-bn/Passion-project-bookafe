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
        const contents = this.state.lists.map((item) =>
            <tr tr className="tableRow" style={{ backgroundColor: item.isComplete ? "#66CDAA" : "#F4A363" }} key={item.id}  >
                <td> {item.bookTitle} </td>
                <td> {item.createdAt} </td>
                {!item.isComplete ? <td>Not Yet</td> : <td>Completed</td>}
                <td> <i className='fa fa-check changeButton' onClick={this.changeStatus} style={{ backgroundColor: item.isComplete ? "#66CDAA" : "#F4A363" }} id={item.id} value={item.bookTitle}></i></td>
                <td> <i className='far fa-trash-alt removeButton' onClick={this.removeItem} style={{ backgroundColor: item.isComplete ? "#66CDAA" : "#F4A363" }} id={item.id}></i></td>
            </tr>
        )
        return (
            <div>
                <table class="table table-sm">
                    <tr className="tableHead-list">
                        <th>Title</th>
                        <th>Date</th>
                        <th>Is it completed?</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {contents}
                </table>
            </div>
        );
    }
}