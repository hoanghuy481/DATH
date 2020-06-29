import React, { Component } from 'react';
import {connect} from 'react-redux';
import { login } from './api/UserFuncions';
import {withRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import {actLogin, actIsLogin, actChangeNotify} from '../actions/index';
import { getUser } from '../components/api/UserFuncions';
import * as notify from './../constants/Notify';

class Login extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			errors: {}
		}
	}

	getUser = () =>{
        if(localStorage.usertoken !== 'undefined'){
           	const token = localStorage.usertoken
			const decoded = jwt_decode(token)
			this.props.isLogin()
			getUser(decoded.id).then(data => {
				this.props.users(data)                
			})
		}		
    }

	onChange = (event) => {
		const target = event.target;    // input selectbox
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}
	onSubmit  = (event) => {
		const user = {
			email: this.state.email,
			password: this.state.password
		}
		login(user).then(res => {
			if (res) {
				this.props.changeNotify(notify.NOTI_TYPE_SUCCESS, notify.NOTI_SIGNIN_SUCCESSFULL_TITLE, notify.NOTI_SIGNIN_SUCCESSFULL_MESSAGE );
				this.getUser();
			} 
		}).catch((error) => {
			this.props.changeNotify(notify.NOTI_TYPE_DANGER, notify.NOTI_SIGNIN_FAIL_TITLE, error);
		  });

		event.preventDefault()
	}

    render(){
	
        return (
            <div className="form-wrapper">
                <p className="signup-text">Signup now and meet awesome people around the world</p>
                <form action="#">
                    <fieldset className="form-group">
                        <input value={this.state.email} onChange={this.onChange} name="email" className="form-control" id="example-email" placeholder="Enter email" />
                    </fieldset>
                    <fieldset className="form-group">
                        <input value={this.state.password} onChange={this.onChange} name="password"  type="password" className="form-control" id="example-password" placeholder="Enter a password" />
                    </fieldset>
                </form>
                <p>By signning up you agree to the terms</p>
                <button onClick={this.onSubmit}  type="submit" className="btn-secondary">Sign in</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		users: (user) => {
            dispatch(actLogin(user));
		},
		isLogin: () => {
            dispatch(actIsLogin());
		},
		changeNotify: (style, title, content) => {
            dispatch(actChangeNotify(style, title, content));
        }
    }
}
export default withRouter(connect(null,mapDispatchToProps)(Login))