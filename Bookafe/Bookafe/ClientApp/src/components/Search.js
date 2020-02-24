import React, { Component } from 'react';

export class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchByTitle:[],
        };
        this.getAll = this.getAll.bind(this);
    }

    //componentDidMount() {
    //    this.getAll();
    //}

    getAll() {
        let title = this.titleToSearch.value;
        const URL = "https://www.googleapis.com/books/v1/volumes?q=untitle:"+title+"&maxResults=10"
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
            <div>
                <input
                    type="text"
                    ref={getTitleInput => (this.titleToSearch = getTitleInput)}
                />
                <button onClick={this.getAll}>Search</button>
                <br />
              <table class="table table-sm table-dark">
                <tr><th>Title</th><th>Author</th><th>Rating</th><th>Image</th></tr>
                {
                    this.state.searchByTitle.map((data) =>
                        <tr>
                            <td>  {data.volumeInfo.title} </td>
                            <td>  {data.volumeInfo.authors[0]} </td>
                            <td>  {data.volumeInfo.averageRating} </td>
                            <td>  <img src={data.volumeInfo.imageLinks.thumbnail} alt="coverimage" height="100" width="140"/> </td>

                        </tr>
                    )}
              </table>
            </div>
            );
    }
}
