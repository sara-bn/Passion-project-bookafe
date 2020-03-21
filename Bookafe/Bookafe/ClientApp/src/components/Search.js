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
        const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q="
        let title = this.titleToSearch.value;
        let author = this.auhtorToSearch.value;

        if (title && author) {

            var URL = BASE_URL+"intitle:" + title + "+inauthor:" + author + "&maxResults=30"
        }

        else if (title) {

            var URL = BASE_URL+"intitle:" + title + "&maxResults=30"
        }

        else if (author) {

            var URL = BASE_URL+"inauthor:" + author + "&maxResults=30"
        }
        else {
            alert("Please enter author or title");
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

        if (this.state.searchResult) {

            const contents = this.state.searchResult.map((data) =>
                <tr>
                    {data.volumeInfo.imageLinks && <td><img className="covers" src={data.volumeInfo.imageLinks.thumbnail} alt="coverimage" /></td>}
                    <td>  <Link key={data.id} to={"/details/" + data.id}> {data.volumeInfo.title}</Link></td>
                    <td>  {data.volumeInfo.authors} </td>
                    <td>  {data.volumeInfo.averageRating} </td>
                   
                </tr>
            )

            return (
                <div>
                    <div className="searchBar">
                    <input className="input"
                        type="text"
                        placeholder="Title"
                        ref={getTitleInput => (this.titleToSearch = getTitleInput)}
                    />
                        <input className="input"
                        type="text"
                        placeholder="Author"
                        ref={getAuthorInput => (this.auhtorToSearch = getAuthorInput)}
                    />
                        <button className="searchButton" onClick={this.getAll}><i class="fa fa-search fa-lg"></i></button>
                        </div>
                    <table class="table table-sm">
                        <tr className="tableHead"><th>Book Cover</th><th>Title</th><th>Author</th><th>Rating</th></tr>
                        {contents}
                    </table>
                </div>
            );
            }
            else {
            return (
                    <div>
                    <div className="searchBar">
                        <input className="input"
                            type="text"
                            placeholder="Title"
                            ref={getTitleInput => (this.titleToSearch = getTitleInput)}
                        />
                        <input className="input"
                            type="text"
                            placeholder="Author"
                            ref={getAuthorInput => (this.auhtorToSearch = getAuthorInput)}
                        />
                        <button className="searchButton" onClick={this.getAll}><i class="fa fa-search fa-lg"></i></button>
                        </div>
                        <p> No Result </p>
                    </div>
                );
            }
        }
    }