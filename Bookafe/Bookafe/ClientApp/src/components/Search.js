import React, { Component } from 'react';


export class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchByTitle:[],
        };
        this.getAll = this.getAll.bind(this);
    }

    componentDidMount() {
        this.getAll();
    }



    getAll() {
        const URL = "https://www.googleapis.com/books/v1/volumes?q=untitle:harrypotter&maxResults=3"
        // This code gets data from the remote server.
        fetch(URL)
            .then(response => response.json())

            // Data Retrieved.
            .then(data => {
                console.log(JSON.stringify(data));
                this.setState({ searchByTitle: data.items });
            })

            // Data Not Retrieved.
            .catch(error => {
                alert(error);
            });
    }

    render() {
        return (
            <ul>
                {this.state.searchByTitle.map((item, index) => (
                    <li key={item.id}>{item.volumeInfo.imageLinks.thumbnail}</li>

                ))}
            </ul>
            );
    }
}
