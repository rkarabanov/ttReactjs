import React from 'react'
import {Link} from 'react-router'
export default React.createClass({
    render:function() {
        return (
            <div className="container">
                <footer>
                    <hr/>
                    <div className="row">
                        <div className="col-lg-offset-1">
                            <p>Copyright &copy; <Link to="/about"> R-key Website</Link> 2016</p>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
})