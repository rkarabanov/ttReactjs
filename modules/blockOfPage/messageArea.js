import React from 'react'
import {Link} from 'react-router'
export default React.createClass({
    contextTypes: {
        users: React.PropTypes.array,
        userIn: React.PropTypes.object,
        changeUser: React.PropTypes.func,
        setURL: React.PropTypes.func,
        profileUser:React.PropTypes.object,
        changeProfileUser:React.PropTypes.func
    },
    render:function () {
         return(
            <div className="row">
                <div className="col-sm-offset-2 col-md-8" >
                    <div className="row">
                        <div className="col-sm-2 col-xs-2">
                            <img className="img-responsive" src={this.context.setURL(this.context.userIn.loginUser)}/>
                        </div>
                        <div className="col-sm-9 col-xs-9"><div className="input-group input-group-lg page-header" style={{borderBottom :'none'}}>
                            <input type="text" className="form-control" required placeholder="Your message..."
                                   aria-describedby="sizing-addon1" id="newMessage"/>
                        <span className="btn btn-primary input-group-addon" id="sizing-addon1" onClick={this.props.sendMessage.bind(null,this.context.userIn.loginUser)}><span
                            className="glyphicon glyphicon-pencil"/></span>
                        </div>
                        </div>
                    </div>
                    <hr/>
                </div>
                </div>
        )
    }
})