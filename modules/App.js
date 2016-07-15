import React from 'react'
import {Link} from 'react-router'
import FooterPage from './blockOfPage/Footer'
import NavbarPage from './blockOfPage/Navbar'
import Tweet from './blockOfPage/Tweet'
import HeaderPage from './blockOfPage/Header'
import MessageArea from './blockOfPage/messageArea'
export default React.createClass({
    render() {
        return (
            < ContentBox/>
        )
    }
})


var ContentPage = React.createClass({
    getInitialState: function () {
        return {
            messages: []
        };
    },
    componentWillMount: function () {
        var self = this;
        var ref = new Firebase("https://blazing-fire-1631.firebaseio.com/");
        ref.child("messages").on("value", function (sn) {
            self.setState({messages: sn.val()});
        });

    },
    contextTypes: {
        userIn: React.PropTypes.object,
        users: React.PropTypes.array
    },
    deleteMessages: function (id) {
        let buf = [];
        for (let one of this.state.messages) {
            if (one.id !== id) {
                buf.push(one);
            }
        }
        // this.setState({messages: buf});
        this.saveMessages(buf);
        // buf = [];
        // for (let j = 0; j < this.context.users.length; j++) {
        //     let one = this.context.users[j];
        //     if (one.whatLikedId && one.whatLikedId.indexOf(id)) {
        //         let i = one.whatLikedId.indexOf(id),
        //             buff = one.whatLikedId,
        //             element = {
        //                 avatarUser: one.avatarUser,
        //                 loginUser: one.loginUser,
        //                 password: one.password,
        //                 whatLikeId: null,
        //                 whoSubscribe: one.whoSubscribe,
        //                 whomSubscribe: one.whoSubscribe
        //             };
        //         buff.splice(i, 1);
        //         if (buff.length > 0) {
        //             element.whatLikeId = buff;
        //         }
        //         buf.push(element);
        //     } else {
        //         buf.push(one);
        //     }
        // }
        // this.props.saveUsers(buf);
        this.props.changeWhatLikedUsers(id, -1);
    },
    saveMessages: function (buf) {
        var ref = new Firebase("https://blazing-fire-1631.firebaseio.com/");
        ref.child("messages").set(
            buf
        );
    },
    getTextMessage: function () {
        let text = document.getElementById("newMessage").value;
        document.getElementById("newMessage").value = "";
        return text;
    },
    sendMessage: function (login) {
        let text = this.getTextMessage(),
            messages = this.state.messages;
        if (text) {
            messages.unshift(this.createMessage(login, this.state.messages[0].id, text));
            this.saveMessages(messages);
        }
        else {
            window.alert("Поле ввода пустое");
        }
    },
    createMessage: function (login, id, text) {
        return {
            dataTTMessege: "" + new Date(),
            id: ++id,
            like: 0,
            loginUser: login,
            ttMessage: text,
            whoLiked: false
        }
    },
    changeLike: function (whoLiked, id, isLike) {
        let userOfName = this.context.userIn.loginUser;
        if (userOfName !== undefined) {
            let changeWhatLikedUsers = 0;
            for (let i = 0; i < this.state.messages.length; i++) {
                // console.log(this.state.messages[i].id);
                if (this.state.messages[i].id === id) {
                    if (!isLike) {
                        this.state.messages[i].like++;
                        if (!this.state.messages[i].whoLiked) {
                            this.state.messages[i].whoLiked = [];
                        }
                        this.state.messages[i].whoLiked[this.state.messages[i].whoLiked.length] = userOfName;
                        changeWhatLikedUsers++;
                    }
                    else {
                        changeWhatLikedUsers--;
                        this.state.messages[i].like--;
                        if (this.state.messages[i].whoLiked.length === 1) {
                            this.state.messages[i].whoLiked = false;
                        } else {
                            for (let j = 0; j < this.state.messages[i].whoLiked.length; j++) {
                                if (this.state.messages[i].whoLiked[j] === userOfName) {
                                    this.state.messages[i].whoLiked.splice(j, 1);
                                    // console.log(this.state.messages[i].whoLiked);
                                    break;
                                }
                            }
                        }
                    }
                    this.saveMessages(this.state.messages);
                    this.props.changeWhatLikedUsers(id, changeWhatLikedUsers, userOfName);
                    break;
                }
            }
        }
    },
    eachNote: function (tweet, i) {
        if (!this.props.profileUser || this.props.profileUser.str === tweet.loginUser) {
            return (
                <Tweet key={tweet.id}
                       tweet={tweet}
                       saveUsers={this.props.saveUsers}
                       deleteTweets={this.deleteMessages}
                       saveMessages={this.saveMessages}
                       changeLike={this.changeLike}
                >
                    <div  >{tweet.ttMessage}</div>
                </Tweet>
            );
        }
    },
    render: function () {
        return (
            <div className="contentPage">
                <div className="row">
                    {this.context.userIn ? (<MessageArea sendMessage={this.sendMessage}/>) : ''}
                    {this.state.messages.map(this.eachNote)}
                </div>
            </div>
        );
    }
});


export default React.createClass({

    getInitialState: function () {
        return {
            users: [],
            userIn: null,
            profileUser: null
        };
    },
    changeUser: function (obj) {
        this.setState({userIn: obj});
    },

    componentWillMount: function () {
        var self = this;
        var ref = new Firebase("https://my-users-r-key.firebaseio.com/");
        ref.child("users").on("value", function (sn) {
            self.setState({users: sn.val()});
        });

    },
    childContextTypes: {
        users: React.PropTypes.array.isRequired,
        userIn: React.PropTypes.object,
        changeUser: React.PropTypes.func.isRequired,
        setURL: React.PropTypes.func.isRequired,
        profileUser: React.PropTypes.object,
        changeProfileUser: React.PropTypes.func.isRequired
    },
    getChildContext: function () {
        return {
            users: this.state.users,
            userIn: this.state.userIn,
            changeUser: this.changeUser,
            setURL: this.setURL,
            profileUser: this.state.profileUser,
            changeProfileUser: this.changeProfileUser
        }
    },
    changeProfileUser: function (str) {
        str ?
            this.setState({profileUser: {str: str}}) : this.setState({profileUser: null});
    },
    setURL: function (name) {
        for (let one of this.state.users) {
            if (one.loginUser === name) {
                return one.avatarUser;
            }
        }
    },
    changeWhatLikedUsers:function(id, flag, userOfName) {
        this.state.users.map((one, i)=> {
            if (!userOfName || one.loginUser === userOfName) {
                if (flag > 0) {
                    if (!this.state.users[i].whatLikeId) {
                        this.state.users[i].whatLikeId = [];
                    }
                    this.state.users[i].whatLikeId.push(id);
                }
                else if (one.whatLikeId && one.whatLikeId.indexOf(id) > -1) {
                    {
                        this.state.users[i].whatLikeId.splice(one.whatLikeId.indexOf(id), 1);
                        if (this.state.users[i].whatLikeId.length === 0) {
                            this.state.users[i].whatLikeId = false;
                        }
                    }
                }
            }
        });
        this.saveUsers(this.state.users);
    },
    saveUsers: function (buf) {
        var ref = new Firebase("https://my-users-r-key.firebaseio.com/");
        ref.child("users").set(
            buf
        );
    },
    render: function () {
        return (
            <div className="contentBox">
                <NavbarPage/>
                <div className="container">
                    <HeaderPage />
                    <ContentPage profileUser={this.state.profileUser} changeWhatLikedUsers={this.changeWhatLikedUsers} saveUsers={this.saveUsers}/>
                </div>
                <FooterPage/>
            </div>
        );
    }
});






