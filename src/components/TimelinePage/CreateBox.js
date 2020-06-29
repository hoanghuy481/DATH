import React , { Component } from 'react';
import {withRouter } from 'react-router-dom';
   
import { createPost } from '../api/PostFuncions';
class CreateBox extends Component {
    constructor() {
		super()
		this.state = {
            title: '',
            post: '',
            audio:null,
			errors: {}
		}

	}
   
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
    } 
    fileAudioChange = event => {
        this.setState({ audio: event.target.files[0] })
    }
	handleSubmit = () =>{
        if (!this.state.audio) {
            alert('Bạn chưa chọn file.')
            return;
        }
        const formData = new FormData();
        formData.append('audio', this.state.audio);
        let {title,post} = this.state;
        let image = this.props.user.avatar;
        let uid = this.props.user.id;
        createPost(uid,title,post,image,formData).then(res =>{
            this.props.history.push(`../`)
        })
    }
    render(){
        return (
            <div className="create-post">
                <div action="/" encType="multipart/form-data" method="post" className="row"  >
                    <input value={this.state.title} onChange={this.onChange} name="title" id="exampleTextarea" cols={30} rows={1} className="form-control" placeholder="Title" />
                    <textarea value={this.state.post} onChange={this.onChange} name="post" id="exampleTextarea" cols={30} rows={1} className="form-control" placeholder="Description" style={{height: `80px`}} />
                    <label >Chọn Audio</label>
                    <input onChange={this.fileAudioChange} type="file" name="audio" id="audio" placeholder="chọn file"/>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-primary pull-right">Save</button>
                </div>
            </div>
        );
    }
}


export default withRouter(CreateBox);