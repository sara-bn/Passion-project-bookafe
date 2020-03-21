import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { LoginMenu } from './api-authorization/LoginMenu';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';


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
                "createdAt":new Date().getDate().toString
            })
        })
            .then(response => response.json())

            .then(json => {
                alert(JSON.stringify(json));
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
                        <p>{this.state.resultDetail.authors}</p>
                        <p>{this.state.resultDetail.description}</p>
                        <button className="addButton" onClick={this.SaveToList}>Add to reading list</button>
                    </div>
                </div>
            </div>
        );
    }
}