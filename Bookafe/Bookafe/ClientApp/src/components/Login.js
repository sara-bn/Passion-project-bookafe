import React, { Component } from 'react';


const AUTH_TOKEN = "auth_token";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            loginMessage: "",
            token: "",
            loggedIn: false,
            loggedOut: false,
            isAdminOrManager: false,
            userEmail: ""
        };
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem(AUTH_TOKEN) != null) {
            this.setState({
                token: sessionStorage.getItem(AUTH_TOKEN)
            });
        }
    }

    login(e) {
        const email = this.email.value;
        const password = this.password.value;
        const rememberMe = false;
        this.email.value = "";
        this.password.value = "";

        fetch('api/login', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Email: email,
                Password: password,
                RememberMe: rememberMe
            })
        })
            // Response received.
            .then(response => response.json())
            // Data retrieved.
            .then(json => {
                // Store token with session data.
                if (json["status"] === "OK") {
                    sessionStorage.setItem(AUTH_TOKEN, json["token"]);

                    this.token = json["token"];
                    console.log(this.token);
                    this.setState({
                        loginMessage: "The user has been logged in.",
                        token: json["token"],
                        loggedIn: true,
                        userEmail: email
                    });
                } else {
                    this.setState({
                        loginMessage: "An error occured at login. Try again."
                    });
                }
            })
            // Data not retrieved.
            .catch(function (error) {
                if (sessionStorage[""]) alert(error);
            });
    }

    logout(e) {
        if (sessionStorage.getItem([AUTH_TOKEN]) != null) {
            sessionStorage.clear();
        }
        this.setState({ loginMessage: "", token: "", loggedOut: true });
    }


    render() {
        return (
            <div className="myPage">
                <table>
                    <thead>
                        <tr>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Email: </td>
                            <td>
                                {" "}
                                <input
                                    type="text"
                                    ref={emailInput => (this.email = emailInput)}
                                />{" "}
                            </td>
                        </tr>
                        <tr>
                            <td>Password: </td>
                            <td>
                                {" "}
                                <input
                                    type="password"
                                    ref={passwordInput => (this.password = passwordInput)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.login}>Login</button>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                {this.state.loggedIn & !this.state.loggedOut && (
                    <div>
                        <button onClick={this.logout.bind(this)}>Logout</button>
                    </div>
                )}
            </div>
        );
    }
}
