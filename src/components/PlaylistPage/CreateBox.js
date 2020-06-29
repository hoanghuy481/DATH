import React , { Component } from 'react';
import {connect} from 'react-redux';


import { createPlaylist } from '../../components/api/PlaylistFuntion';
class CreateBox extends Component {
    constructor() {
		super()
		this.state = {
            title: '',
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
        const newList ={
            title: this.state.title,
            users_id: this.props.user.id
        }
        createPlaylist(newList).then(res =>{
            this.props.getPlaylist(newList.users_id) 
            
        })
        this.setState({title: ''})    
    }
    render(){
        return (
            <div className="create-post">
                <div className="row">
                        <div className="form-group">
                            <h5>PlayList title: </h5>
                            <textarea value={this.state.title} onChange={this.onChange} name="title" id="exampleTextarea" cols={30} rows={1} className="form-control" placeholder="Playlist title"/>
                        </div>
                        <button onClick={this.handleSubmit} type="submit" className="btn btn-primary pull-right">Create</button>
                </div>
            </div>
        );
    }
}

export default connect(null,null)(CreateBox)

