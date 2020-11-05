import React, { Component } from 'react';


export class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultDetail: {},
        };
        this.SaveToList = this.SaveToList.bind(this);
    }
    async componentDidMount() {
        let id = this.props.match.params.id
        let response;
        const URL = "https://www.googleapis.com/books/v1/volumes/"+id;
        await fetch(URL)
            .then(response => response.json())

            .then(data => {
                response = data
            })
            .catch(error => {
                alert(error);
            });

        console.log(JSON.stringify(response));
        console.log(URL)
        this.setState({ resultDetail: response.volumeInfo });
        console.log(this.state.resultDetail)
    }

    async SaveToList(e) {
        console.log(this.state.resultDetail.title);
        const theUser = localStorage.getItem('myuser');
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        await fetch('api/lists', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "bookTitle" : this.state.resultDetail.title,
                "IsComplete": false,
                "userEmail": theUser,
                "createdAt": new Date().getDate() + "-" + months[(new Date().getMonth())] + "-" + new Date().getFullYear()
            })
        })
            .then(response => response.json())

            .then(json => {
                //alert(JSON.stringify(json));
                this.props.history.push('/list');
            })
            .catch(function (error) {
                alert(error);
            });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>{this.state.resultDetail.title}</h1>
                        <p>{this.state.resultDetail.authors} </p>
                        <p>{this.state.resultDetail.description}</p>
                        <button className="add-button" onClick={this.SaveToList}>Add to reading list</button>
                    </div>
                </div>
            </div>
        );
    }
}