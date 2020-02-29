import React, { Component } from 'react';

export class List extends Component {
    constructor() {
        super();
        this.state = {
            lists:[]
        };

        fetch('api/lists')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    lists: data
                });
            });
            }
            componentDidMount() {

            }
            render() {

                return (
                    <div>
                        <table class="table table-sm table-dark">
                            <tr><th>Title</th><th>IsComplete</th><th>UserEmail</th></tr>
                            {
                                this.state.lists.map((data) =>
                                    <tr>
                                        <td> {data.bookTitle} </td>
                                        <td> {data.IsComplete} </td>
                                        <td> {data.userEmail} </td>
                                    </tr>
                                )}
                        </table>
                    </div>
                );
            }
        }
