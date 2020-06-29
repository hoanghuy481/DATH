import React , { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {withRouter} from 'react-router-dom';

//import ModaPost from './Modal/ModaPost'

import PostContentDetail from './PostContentDetail'

class PostContent extends Component {
    constructor() {
        super()
        this.state = {
            errors: {}
        }
	}

    render(){
        let item ={id: '',post: '',pictures: '',videos:'',id_user:'',created:'' }
        item = this.props.post !== null ? this.props.post : item;
        let {user} = this.props;   
        
        return (         
            <div className="post-content">
                <div className="post-date hidden-xs hidden-sm">          
                   <h5>{user.first_name} {user.last_name}</h5>
                    <p className="text-grey">Sometimes ago</p>
                </div> 
                <PostContentDetail post={item} user={user} getRe={this.props.getRe}/>
                
                {/*Popup  */}
                {/*Popup End*/}
            </div>                  
        );
    }
}

export default withRouter(PostContent);