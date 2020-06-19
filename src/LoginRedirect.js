import React from 'react';
import "./RedirectStyle.css";


export default class LoginRedirect extends React.Component {
    componentDidMount() {
        //As of right now we are using implicit flow- this might not be the best idea because a refresh token
        //may be preferred for authentication longevity.
        window.location.href = "https://www.reddit.com/api/v1/authorize?client_id=q6e0m2w294-5MA&response_type=token&redirect_uri=http://localhost:3000/token&scope=*&state=pbox";
    }

    render() {
        return (
            <h1 className="redirect-message">Redirecting to LOGIN...</h1>
        );
    }
}
