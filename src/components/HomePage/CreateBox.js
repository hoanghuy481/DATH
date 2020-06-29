import React , { Component } from 'react';
import {connect} from 'react-redux';
import { createPost } from '../api/PostFuncions';

class CreateBox extends Component {
    constructor() {
		super()
		this.state = {
            texts: '',
            pictures:'',
            video:'',
			errors: {}
		}
	
		this.onChange   = this.onChange.bind(this)
        this.onSubmit   = this.onSubmit.bind(this)

	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
    }
	onSubmit(e) {
		e.preventDefault()

		const posts = {
            post: this.state.texts,
            pictures: this.state,
            video:this.state,
			id_user: this.props.user.info.id
		}

		createPost(posts).then(res => {
           // this.props.getRe(posts.id_user)
        })       
        this.setState({texts: ''});
    }
    
    render(){
        return (
            <div className="create-post">
                <div className="row">
                    <div className="col-md-7 col-sm-7">
                        <div className="form-group">
                            <img src="images/users/user-1.jpg" alt="" className="profile-photo-md" />
                            <textarea value={this.state.texts} onChange={this.onChange} name="texts" id="exampleTextarea" cols={30} rows={1} className="form-control" placeholder="Write what you wish"/>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-5">
                        <div className="tools">
                            <ul className="publishing-tools list-inline">
                                <li><a href="# "><i className="ion-compose" /></a></li>
                                <li><a href="# "><i className="ion-images" /></a></li>
                                <li><a href="# "><i className="ion-ios-videocam" /></a></li>
                                <li><a href="# "><i className="ion-map" /></a></li>
                            </ul>
                            <button onClick={this.onSubmit} type="submit" className="btn btn-primary pull-right">Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,null) (CreateBox);