import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { LoginMenu } from './api-authorization/LoginMenu';

export class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultDetail: {},
        };
        this.SaveToList = this.SaveToList.bind(this);
    }
    componentDidMount() {
        let id = this.props.match.params.id
        const URL = "https://www.googleapis.com/books/v1/volumes/"+id;
        fetch(URL)
            .then(response => response.json())

            .then(data => {
                console.log(JSON.stringify(data));
                console.log(URL)
                this.setState({ resultDetail: data.volumeInfo });
                console.log(this.state.resultDetail)
            })
            .catch(error => {
                alert(error);
            });
    }

    SaveToList(e) {
        console.log(this.state.resultDetail.title);
        //const theUser = "sarajun";//localStorage.getItem('myuser');
        fetch('api/lists', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userEmail": this.state.resultDetail.title,
                "bookTitle" : this.state.resultDetail.title,
                "IsComplete" : false
            })
        })

            .then(response => response.json())

            .then(json => {
                alert(JSON.stringify(json));

            })

            .catch(function (error) {
                alert(error);
            });
    }

    render() {

        return (
            <div className="container">
                <div class="row">
                    <div class="col-12">
                        <h1>{this.state.resultDetail.title}</h1>
                        <p>{this.state.resultDetail.authors}</p>
                        <p>{this.state.resultDetail.description}</p>
                        <button onClick={this.SaveToList}><Link key={this.state.resultDetail.title} to={"/list/" + this.state.resultDetail.title}>Add to reading list</Link></button>
                    </div>
                </div>
            </div>
        );
    }
}