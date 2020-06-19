import React from "react";
import Websocket from "react-websocket";
import cookie from "react-cookies";
import './Chat.css';
import loader from "./orange-loader.gif";
import check from "./green-check.png";
import redx from "./red-x.jpg";
/*

[* TODO LIST *]
- Auto scroll to bottom on message
- rtjson not available- possible on message delete?  need to look into socket stream and control flow around this
- *** Find out if user is streaming via endpoint + the post id ***
 */

// *** Janky sleep function found on stackoverflow
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = {messageList: [], websocketUrl: "", postId: "", loadState: "enter", overlay: true};
    }

    //Function for handling message over websocket server
    handleData(data){
        //Parse data and extract author and body
        let dataJson = JSON.parse(data);
        let messageAuthor = dataJson['payload']['author'];
        let messageBody = "";
        if (dataJson['payload']['rtjson'] != null) {
            messageBody = dataJson['payload']['rtjson']['document'][0]['c'][0]['t'];
            //Concat to old message list by creating a new message list
            let newList = this.state.messageList.concat({author: messageAuthor, body: messageBody});
            //Use new message list
            this.setState({ messageList: newList });
        }
    }

    //Function for handling storing user input as it is typed for post id
    handleChange = (event) => {
        this.setState({postId: event.target.value});
    };

    //Function for handling submission for post id
    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({loadState: "loading"});
        //Load token
        let token = cookie.load("token");
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + token);
        headers.append("User-Agent", "PandorasBox/0.1");
        let getSettings = {
            method: 'GET',
            headers: headers
        };
        //API call to get websocket server from post id
        fetch(`https://strapi.reddit.com/videos/t3_${this.state.postId}`, getSettings)
            .then(response => {
                //Handle whether or not the API call was successful
                if (response.status == "200") {
                    this.setState({loadState: "success"})
                } else {
                    this.setState({loadState: "fail"});
                }
                return response.json().then((result) => {
                    if (this.state.loadState == "success") {
                        //Use the websocket server retrieved from API call
                        this.setState({websocketUrl: result.data.post.liveCommentsWebsocket});
                        sleep(3000).then(() => {
                            //Close overlay after 3 seconds
                            this.setState({overlay: false});
                        });
                    }
                });
            });

    };

    render(){
        return (
            <div className="maintainer">
                <div className={this.state.overlay ? "overlay" : "overlay hidden"}>
                    <div className="overlay-form">
                        { (this.state.loadState == "enter") ?
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                <span>POST ID:</span>
                                <div><input type="text" onChange={this.handleChange} className="input-id"/></div>
                            </label>
                            <input type="submit" value="SET" className="submit-id"/>
                        </form>
                            : ((this.state.loadState == "loading") ?
                                <img className="loader" src={loader}/>
                                : ((this.state.loadState == "success") ?
                                    <div className="load-final"><img className="check" src={check}/><div>STREAM CONNECTED</div></div>
                                :  <div className="load-final"><img className="error" src={redx}/><div>ERROR</div></div>))}
                    </div>
                </div>
                <div className="chat-wrapper">
                {
                    this.state.websocketUrl !== "" ? <Websocket url={this.state.websocketUrl} onMessage={this.handleData.bind(this)}/>
                    : ""
                }

                    <div className="chat-window">
                        <ul>
                            {this.state.messageList.map((msg) =>
                                <li>
                                    <img className="prof-pic" src="https://www.redditstatic.com/avatars/avatar_default_17_FFD635.png"/>
                                    <span className="msg-author">u/{msg.author}</span>
                                    <p>{msg.body}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
