import React from 'react';
import cookie from 'react-cookies';
import "./RedirectStyle.css";

export default class TokenCatcher extends React.Component {
    constructor(){
        super();
        const token = /#access_token=([^]*)\&token/.exec(window.location.href)[1];
        cookie.save('token', token, { path: '/' });
        window.location.href = "http://localhost:3000/"
    }

    render(){
        return(
            <h1 className="redirect-message">Login Successful.  Redirecting...</h1>
        )
    }
}
