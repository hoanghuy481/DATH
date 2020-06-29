import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom'

import Register from '../components/Register';

class RegisterPage extends Component {
    
    render(){
		let {isLogin} = this.props;
		
		if(isLogin.isLogin === true) {
			return <Redirect to="/" />;
		}
        return (
            <div>
                <section id="banner">
                <div className="container">
                    <div className="container wrapper">
                        <div className="sign-up-form">
                            <a href="index.html" className="logo"><img src="images/logo.png" alt="Friend Finder" /></a>
                            <h2 className="text-white">Find My Friends</h2>
                            <div className="line-divider" />
                                <Register/>
                            <Link to="/Login">Already have an account?</Link>
                            <img className="form-shadow" src="images/bottom-shadow.png" alt="" />
                        </div>
                    </div>
                    <svg className="arrows hidden-xs hidden-sm">
                        <path className="a1" d="M0 0 L30 32 L60 0"></path>
                        <path className="a2" d="M0 20 L30 52 L60 20"></path>
                        <path className="a3" d="M0 40 L30 72 L60 40"></path>
                    </svg>
                </div>
            </section>
            <section id="features">
			<div className="container wrapper">
				<h1 className="section-title slideDown">social herd</h1>
				<div className="row slideUp">
					<div className="feature-item col-md-2 col-sm-6 col-xs-6 col-md-offset-2">
						<div className="feature-icon"><i className="icon ion-person-add"></i></div>
						<h3>Make Friends</h3>
					</div>
					<div className="feature-item col-md-2 col-sm-6 col-xs-6">
						<div className="feature-icon"><i className="icon ion-images"></i></div>
						<h3>Publish Posts</h3>
					</div>
					<div className="feature-item col-md-2 col-sm-6 col-xs-6">
						<div className="feature-icon"><i className="icon ion-chatbox-working"></i></div>
						<h3>Private Chats</h3>
					</div>
					<div className="feature-item col-md-2 col-sm-6 col-xs-6">
						<div className="feature-icon"><i className="icon ion-compose"></i></div>
						<h3>Create Polls</h3>
					</div>
				</div>
				<h2 className="sub-title">find awesome people like you</h2>
				<div id="incremental-counter" data-value="101242"></div>
				<p>People Already Signed Up</p>
				<img src="images/face-map.png" alt="" className="img-responsive face-map slideUp hidden-sm hidden-xs" />
			</div>

		</section>
            </div>
          );
    }
}
const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    }
}

export default connect(mapStateToProps, null)(RegisterPage);