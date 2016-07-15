import React from 'react'
import { Link } from 'react-router'
export default React.createClass({
    contextTypes: {
        users: React.PropTypes.array.isRequired,
        userIn: React.PropTypes.object,
        changeUser: React.PropTypes.func.isRequired,
        setURL: React.PropTypes.func.isRequired,
        profileUser:React.PropTypes.object,
        changeProfileUser:React.PropTypes.func.isRequired
    },
    render: function () {
        // console.log(this.props.userIn);
        return (
            <div className="headerPage">
                <div className="row">
                    <div className="col-sm-offset-1 col-lg-3 col-md-4 col-xs-7 col-sm-7">
                        <h1>
                            <span className="glyphicon glyphicon-sunglasses"/> {(this.context.profileUser)?this.context.profileUser.str:"TipoTwitter"}
                        </h1>
                    </div>
                </div>
                <hr/>
            </div>

        );
    }
})