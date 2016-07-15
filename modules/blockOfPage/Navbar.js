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
    isLogIn: function () {
        let password = document.getElementById("password").value,
            login = document.getElementById("login").value,
            flag = false;
        try{
        for (let one of this.context.users) {
            if (login === one.loginUser && password === one.password) {
                this.context.changeUser(one);
                flag = true;
                break;
            }
        }
    }catch(e){
    console.log("Error!");
}
        if (!flag) {
            window.alert("Неверен пароль или ненайден пользователь с таким логином");
        }
    },
    render: function () {
        return (
            <div className="navbarPage">
                <nav className="navbar navbar-inverse" class="navbar-fixed-top" role="navigation" id="navbar">
                    <div className="container">
                        <div className="navbar-header" id="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#navbar">
                                <span className="sr-only">Toggle navigation</span>

                            </button>
                            { !window.location.hash.includes("/registration")? (<div onClick={this.context.changeProfileUser.bind(null,null)}>
                            <div className="navbar-brand" ><span className="glyphicon glyphicon-sunglasses"/>&#xA0;Main</div>
                        </div>
                            ):(<Link to="/" className="navbar-brand" ><span className="glyphicon glyphicon-sunglasses"/>TipoTweeter</Link>
                            )}</div>
                        <div className=" navbar-collapse collapse " aria-expanded="false"
                             id="bs-example-navbar-collapse-1">

                            <ul className="nav navbar-nav navbar-right">

                                { !window.location.hash.includes("/registration")?(this.context.userIn ? (<form className="form-inline navbar-form">
                                    <Link to="/"> <img className="round"
                                                       src={this.context.setURL(this.context.userIn.loginUser)}/>
                                        <button className="btn btn-info btn-sm"> {this.context.userIn.loginUser} &nbsp;
                                            <span className="glyphicon glyphicon-log-in"/></button>
                                    </Link>
                                    <button type="submit" className="btn btn-danger btn-sm"
                                            onClick={this.context.changeUser.bind(null,null)}><span
                                        className="glyphicon glyphicon-log-out"/></button>
                                </form>)
                                    :
                                    (<form className="form-inline navbar-form ">
                                            <div className="form-group form-group-sm" role="form">
                                                <label className="sr-only" htmlFor="login">Login</label>
                                                <input type="text" className="form-control " id="login"
                                                       placeholder="Login"/>
                                            </div>
                                            <div className="form-group form-group-sm" role="form">
                                                <label className="sr-only" htmlFor="password">Password</label>
                                                <input type="password" className="form-control" id="password"
                                                       placeholder="Password"/>
                                            </div>
                                            <button type="submit" className="btn btn-info  btn-sm btn-login"
                                                    onClick={this.isLogIn}>Sign in
                                            </button>
                                            <Link to="/registration">
                                                <button type="submit" className="btn btn-success  btn-sm btn-login">
                                                    Register
                                                </button>
                                            </Link>
                                        </form>
                                    )):"" }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )

    }
})