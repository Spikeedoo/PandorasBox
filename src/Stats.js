import React from "react";
import cookie from "react-cookies";

export default class Stats extends React.Component {
    state = {
      loading: true
    };

    async componentDidMount() {
        // Grab token cookie
        let token = cookie.load('token');
        // Set up headers
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + token);

        let getSettings = {
            method: 'GET',
            headers: headers
        };
        let usernameResponse = await fetch("https://oauth.reddit.com/api/v1/me", getSettings);
        let usernameData = await usernameResponse.json();
        let username = usernameData.name;

        let keepItOneHundred = await fetch(`https://oauth.reddit.com/user/${username}/submitted?limit=100`);
        let lastHundred = await keepItOneHundred.json();


        this.setState({ user: username, loading: false });
    }

    render(){
        return(
            <div>
                {this.state.loading ? (
                    <div>Loading stats...</div>
                ) : (
                    <div>
                        <h1>{this.state.user}</h1>
                    </div>
                )}
            </div>
        );
    }
}
