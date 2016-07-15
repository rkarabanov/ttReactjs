import React from 'react'
import {Link} from 'react-router'
export default React.createClass({
    contextTypes: {
        users: React.PropTypes.array.isRequired,
        userIn: React.PropTypes.object,
        changeUser: React.PropTypes.func.isRequired,
        setURL: React.PropTypes.func.isRequired,
        profileUser: React.PropTypes.object,
        changeProfileUser: React.PropTypes.func.isRequired
    },

    getFilterData: function (date) {
        let arr = date.split(' ');
        let dateAndTime = '';
        for (let i = 1; i < 5; i++) {
            dateAndTime += " " + arr[i];
        }
        return dateAndTime;
    },
    isLike:function (arr) {
    return arr && this.context.userIn&&arr.indexOf(this.context.userIn.loginUser)>-1;
    },

    render: function () {

        return (
            <div className="tweet">
                <div className="col-sm-offset-2 col-md-8">
                    <div className="row">
                        <div className="col-sm-2 col-xs-2">
                            <img className="img-responsive" src={this.context.setURL(this.props.tweet.loginUser)}/>
                        </div>
                        <div className="col-sm-9 col-xs-9 tweetBody">
                            <Link to="/" onClick={this.context.changeProfileUser.bind(null,this.props.tweet.loginUser)}
                                 style={{color :'#1D39D5'}}><span><b><span
                                className="glyphicon glyphicon-user"/>
                                &#xA0;{this.props.tweet.loginUser}</b></span></Link>
                            {(this.context.userIn && this.context.userIn.loginUser === this.props.tweet.loginUser) ?
                                <span className="glyphicon glyphicon-remove remove" onClick={this.props.deleteTweets.bind(null,this.props.tweet.id)}/>
                                :
                                ""
                            }
                            <h4>{this.props.children}</h4>
                            <div className="tweetBottom col-sm-12 col-xs-12"><span className="elements-tweetBottom"> <span
                                className="glyphicon glyphicon-time"/> {this.getFilterData(this.props.tweet.dataTTMessege)}</span>
                                            <span className="heart" onClick={this.context.userIn
                                            ?
                                            this.props.changeLike.bind(null,this.props.tweet.whoLiked,this.props.tweet.id,this.isLike(this.props.tweet.whoLiked))
                                            :""}><span>{this.props.tweet.whoLiked.length ? this.props.tweet.whoLiked.length : ""}</span>
                                             <span className={this.isLike(this.props.tweet.whoLiked)?" glyphicon glyphicon-heart":"glyphicon glyphicon-heart-empty"}/></span></div>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
        );
    }
})