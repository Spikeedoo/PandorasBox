import React from "react";
import logo from './pandorasbox.png';
import './App.css';
import {
    Link
} from "react-router-dom";

export default function Home(){
    return(
        <div className="grid-wrapper">
            <ul className="navigation">
                <li className="navItemImage"><img src={logo}/></li>
                <li className="navItem"><Link to="/chat"><i class="fas fa-comment-dots"></i> CHAT</Link></li>
                <li className="navItem"><Link to="/stats"><i class="fas fa-chart-bar"></i> STATS</Link></li>
                <li className="navItem"><Link to="/settings"><i class="fas fa-cog"></i> SETTINGS</Link></li>
            </ul>
        <div className="welcome">
            <p>
                Welcome to PANdora's Box!
            </p>
            <p>
                This is an application built to put more power into the hands of RPAN streamers!  I am currently
                working on integrating different tools to improve the experience for content creators on the Public Access Network.
            </p>
            <p>
                Be sure to visit the GitHub repository at () and keep your eyes peeled for future projects!
            </p>
            <p>
                - u/Spikeedoo
            </p>
        </div>
    </div>
);
}
