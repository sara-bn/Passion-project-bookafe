import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card'
export class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchResult: [],
            showTable: false,
        };
        this.getAll = this.getAll.bind(this);
    }

    getAll() {
        const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q="
        let title = this.titleToSearch.value;
        let author = this.auhtorToSearch.value;

        if (title && author) {

            var URL = BASE_URL+"intitle:" + title + "+inauthor:" + author + "&maxResults=40"
        }

        else if (title) {

            var URL = BASE_URL+"intitle:" + title + "&maxResults=40"
        }

        else if (author) {

            var URL = BASE_URL+"inauthor:" + author + "&maxResults=40"
        }
        else {
            alert("Please enter author or title");
        }
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log(JSON.stringify(data));
                console.log(URL)
                this.setState({ searchResult: data.items });
                console.log(URL)
                this.setState({ showTable: true });
            })
            .catch(error => {
                alert(error);
            });
    }
    render() {
        if (this.state.searchResult) {
            const contents = this.state.searchResult.map((item) =>
                <Card className="card-style">
                    {item.volumeInfo.imageLinks && <Card.Img variant="top" src={item.volumeInfo.imageLinks.thumbnail} alt="coverimage" />}
                                    <Card.Body>
                        <Card.Title>{item.volumeInfo.title}</Card.Title>
                        <Card.Text>
                            {item.volumeInfo.authors}
                              </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                        <small className="text-muted"><Link key={item.id} to={"/details/" + item.id}>Read more</Link></small>
                                    </Card.Footer>
                                </Card>
            )
            return (
                <div>
                    <div className="search-bar">
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
                    {this.state.showTable &&
                        <CardGroup>
                        {contents}
                        
                        </CardGroup>
                    }
                    
                </div>
            );
            }
            else {
            return (
                <div >
                    <div className="search-bar">
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