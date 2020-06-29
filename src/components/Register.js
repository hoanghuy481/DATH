import React, { Component } from 'react';
import { register } from './api/UserFuncions';
import {withRouter} from 'react-router-dom';
import { uuid } from 'uuidv4';

class Register extends Component {
	constructor() {
		super()
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			errors: {}
		}
	
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit(e) {
		e.preventDefault()
	
		const newUser = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			password: this.state.password,
			uid : uuid()
		}
	
		register(newUser).then(res => {
			this.props.history.push(`/login`)
		})		
	}

    render(){
        return (
            <div className="form-wrapper">
                <p className="signup-text">Signup now and meet awesome people around the world</p>
                <form action="#" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">First name</label>
						<input
							type="text"
							className="form-control"
							name="first_name"
							placeholder="Enter your first name"
							value={this.state.first_name}
							onChange={this.onChange}
							/>
					</div>
					<div className="form-group">
						<label htmlFor="name">Last name</label>
						<input
							type="text"
							className="form-control"
							name="last_name"
							placeholder="Enter your last name"
							value={this.state.last_name}
							onChange={this.onChange}
							/>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email address</label>
						<input
							type="email"
							className="form-control"
							name="email"
							placeholder="Enter email"
							value={this.state.email}
							onChange={this.onChange}
							/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							className="form-control"
							name="password"
							placeholder="Password"
							value={this.state.password}
							onChange={this.onChange}
							/>
					</div>
                </form>
                <p>By signning up you agree to the terms</p>
                <button onClick={this.onSubmit}  type="submit" className="btn-secondary">Signup</button>
            </div>
        );
    }
}


export default withRouter(Register);