import React, { Component } from 'react';

export class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultDetail: {}, 
          
        };
    }
    componentDidMount() {
        let id = this.props.match.params.id
        const URL = "https://www.googleapis.com/books/v1/volumes/" + id;
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
         render() {
         
                return (
                    <div className="container">
                        <div class="row">
                            <div class="col-12">
                                <h1>{this.state.resultDetail.title}</h1>
                                <p>{this.state.resultDetail.authors}</p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
