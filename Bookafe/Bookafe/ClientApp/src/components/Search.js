import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchResult: [],
        };
        this.getAll = this.getAll.bind(this);
    }

    getAll() {
        let title = this.titleToSearch.value;
        let author = this.auhtorToSearch.value;

        if (title && author) {

            var URL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + title + "+inauthor:" + author + "&maxResults=15"
        }

        else if (title) {

            var URL = "https://www.googleapis.com/books/v1/volumes?q=intitle:" + title + "&maxResults=15"
        }

        else if (author) {

            var URL = "https://www.googleapis.com/books/v1/volumes?q=inauthor:" + author + "&maxResults=15"
        }
        else {
            alert("please ");
        }

        // This code gets data from the remote server.
        fetch(URL)
            .then(response => response.json())
            // Data Retrieved.
            .then(data => {
                console.log(JSON.stringify(data));
                console.log(URL)
                this.setState({ searchResult: data.items });
                console.log(URL)
            })

            // Data Not Retrieved.
            .catch(error => {
                alert(error);
            });
    }

    render() {
        const contents = this.state.searchResult.map((data) =>
            <tr>
                <td>  <Link key={data.id} to={"/details/" + data.id}> {data.volumeInfo.title}</Link></td>
                <td>  {data.volumeInfo.authors} </td>
                <td>  {data.volumeInfo.averageRating} </td>
                {data.volumeInfo.imageLinks && <td><img src={data.volumeInfo.imageLinks.thumbnail} alt="coverimage" height="80" width="100" /></td>}
            </tr>
        )

        return (
            <div>
                <input
                    type="text"
                    placeholder="title"
                    ref={getTitleInput => (this.titleToSearch = getTitleInput)}
                />
                <br />
                <input
                    type="text"
                    placeholder="author"
                    ref={getAuthorInput => (this.auhtorToSearch = getAuthorInput)}
                />
                <br />
                <button onClick={this.getAll}>Search</button>
                <br />
                <table class="table table-sm table-dark">
                    <tr><th>Title</th><th>Author</th><th>Rating</th><th>Image</th></tr>
                    {contents}
                </table>
            </div>
        );
    }
}