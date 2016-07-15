import React from 'react'
import {Link} from 'react-router'
import FooterPage from './blockOfPage/Footer'
import NavbarPage from './blockOfPage/Navbar'
export default React.createClass({

    render() {
        return (
            < RegistrBox/>
        )
    }
})
var RegistrBox = React.createClass({
    getInitialState: function () {
        return {
            users: []
        };
    },

    componentWillMount: function () {
        var self = this;
        var ref = new Firebase("https://my-users-r-key.firebaseio.com/");
        ref.child("users").on("value", function (sn) {
            self.setState({users: sn.val()});
        });

    },
    isOkPassword: function (password) {
        return password.length > 4;
    },

    isOkConfirm: function (confirm, password) {
        return this.isOkPassword(password) && confirm === password;
    },

    isOkUsername: function (username) {
        if (username === "") {
            return false;
        }
        for (let one of   this.state.users) {
            if (one.loginUser === username) {
                console.log("It's was " + username);
                return false;
            }
        }
        return true;
    },

    registr: function (username, password, url) {
        return {
            avatarUser: url,
            loginUser: username,
            password: password,
            whatLikedId: false,
            whoSubscribe: false,
            whomSubscribe: false
        };
    },
    isRegister: function () {
        let username = document.getElementById('username').value,
            password = document.getElementById('passwordreg').value,
            confirm = document.getElementById('confirm').value,
            url = document.getElementById('url').value,
            labels = $('label'),
            seccessed = 0;
        if (!labels.eq(0).find('span').length) {
            for (let i = 0; i < labels.length - 1; i++) {
                labels.eq(i).append('<span class="glyphicon"></span>')
            }
        } else {
            labels.find("span").removeClass("glyphicon-remove");
            labels.find("span").removeClass("glyphicon-ok");
        }

        if (this.isOkUsername(username)) {
            seccess(2);
        }
        else {
            unseccess(2);
        }

        if (this.isOkPassword(password)) {
            seccess(3);
        } else {
            unseccess(3)
        }

        if (this.isOkConfirm(confirm, password)) {
            seccess(4);
        } else {
            unseccess(4);
        }
        url = url || "http://cs7054.vk.me/c540107/v540107359/2729/fYQlS_23QdA.jpg";

        if (seccessed === 3) {
            this.state.users.push(this.registr(username, password, url));
            this.saveUsers();
            $('#registr').addClass('btn-success');
            document.getElementById('registr').innerHTML = " Now you may log in like \'" + username + '\'';
            setTimeout(function () {
                document.location.href = "/";
            }, 5000);
        } else {
            seccessed = 0;
        }

        function seccess(i) {
            labels.eq(i - 2).find("span").addClass("glyphicon-ok");
            seccessed++;
        }

        function unseccess(i) {
            labels.eq(i - 2).find("span").addClass("glyphicon-remove");

        }
    },
    saveUsers: function () {
        var ref = new Firebase("https://my-users-r-key.firebaseio.com/");
        ref.child("users").set(
            this.state.users
        );
    },
    render: function () {
        return (
            <div className="contentBox">
                <NavbarPage/>
                <div className="container">
                    <div className="row main">
                        <div className="panel-heading">
                            <div className="panel-title text-center">
                                <h1 className="title">Registration</h1>
                                <hr/>
                            </div>
                        </div>
                        <div
                            className="col-sm-offset-3 col-lg-offset-3 col-xs-offset-1  col-sm-6 col-lg-6 col-xs-10 main-login main-center">
                            <form className="form-horizontal" method="post" action="#">
                                <div className="form-group">
                                    <label htmlFor="username"
                                           className="cols-sm-2 control-label">*Username&nbsp;</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i
                                                className="glyphicon glyphicon-user"/></span>
                                            <input type="text" className="form-control" name="username" id="username"
                                                   placeholder="Enter your Username"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordreg"
                                           className="cols-sm-2 control-label">*Password&nbsp;</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i
                                                className="glyphicon glyphicon-lock"/></span>
                                            <input type="password" className="form-control" name="password"
                                                   id="passwordreg"
                                                   placeholder="Enter your Password"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm" className="cols-sm-2 control-label">*Confirm
                                        Password&nbsp;</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-lock"
                                                                                   aria-hidden="true"/></span>
                                            <input type="password" className="form-control" name="confirm" id="confirm"
                                                   placeholder="Confirm your Password"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="url" className="cols-sm-2 control-label">URL image&nbsp;</label>
                                    <div className="cols-sm-10">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i
                                                className="glyphicon glyphicon-picture"/></span>
                                            <input type="url" className="form-control" name="url" id="url"
                                                   placeholder="Enter your URL"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group ">
                                    <button type="button" className="btn btn-primary btn-lg btn-block login-button"
                                            id="registr"
                                            onClick={this.isRegister}>
                                        Register
                                    </button>
                                </div>
                                <div>
                                    * - Obligatory field.
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <FooterPage />
            </div>
        )


    }
});