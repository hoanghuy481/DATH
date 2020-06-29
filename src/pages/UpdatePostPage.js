import React , { Component } from 'react';
import {connect} from 'react-redux';
import {FormGroup, Label, Input,Form} from 'reactstrap';

import { createPost } from '../components/api/PostFuncions';
import SidebarLeft from '../components/HomePage/SidebarLeft';
import SidebarRight from '../components/HomePage/SidebarRight';

class UpdatePostPage extends Component {
    constructor() {
		super()
		this.state = {
            text: null,
			errors: {}
		}
	}
   
    fileAudioChange = event => {
        this.setState({ audio: event.target.files[0] })
    }

    uploadHandler = (event) =>{

        
        event.preventDefault();
    }
	
    render(){
        return (
            <div className="row">
                <SidebarLeft user={this.props.user} />  
                <div className="col-md-7">
                    <div className="friend-list">
                        <div className="row">
                        <input onChange={this.fileAudioChange} type="file" name="audio" id="audio" placeholder="chọn file"/>
                        </div>
                    </div>
                    <button onClick={this.uploadHandler} type="submit" className="btn btn-primary pull-right">upload</button>
                </div>
                <SidebarRight/>
            </div>
          );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,null) (UpdatePostPage);
