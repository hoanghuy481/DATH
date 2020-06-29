import React , { Component } from 'react';
import {connect} from 'react-redux';
import ModalUpdateUser from './ModalUpdateUser'
class About extends Component {
    constructor() {
		super()
		this.state = {
			errors: {}
		}
	}
   
    render(){
        let {user} = this.props;
        let xbutton = null;
        if(this.props.user.uid === this.props.myuser.uid){
            xbutton = <button data-toggle="modal" data-target={`#updateuser-${user.id}`} type="submit" className="btn btn-warning pull-right">Edit</button>
        };
        return (
            <div className="col-md-7">
                <div className="create-post">
                    <div className="row">
                        <h2>My Profile</h2>
                    </div>
                </div>
                <div className="post-container">
                    <div className="form-group">
                        <h5 className="about-h5">First Name: </h5>
                        <p className="about-p">{user.first_name}</p>
                        <h5 className="about-h5">Last Name: </h5>
                        <p className="about-p">{user.last_name}</p>
                        <h5 className="about-h5">Email: </h5>
                        <p className="about-p">{user.email}</p>
                        <h5 className="about-h5">Bio: </h5>
                        <p className="about-p">{user.bio}</p>
                    </div>
                    {xbutton}
                    
                    <ModalUpdateUser user={user} getRe={this.props.getRe} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        myuser: state.user
    }
}

export default connect(mapStateToProps,null)(About)

