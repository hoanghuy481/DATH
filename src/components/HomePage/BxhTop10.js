import React , { Component } from 'react';
import {Link } from "react-router-dom";

class BxhTop10 extends Component {
    render(){
        let post ={ id: '', post: '', image: '',videos:'',like:'',id_user:'',created:'',title:'',audio:'',view:''}
        post = this.props.post !== undefined ? this.props.post : post;
        let index = this.props.index+1
        let xImage = null;
        if(post.image == null ){
            xImage = <img className="profile-photo-sm pull-left" src={`/images/users/${post.avatar}`} alt="tet" />
        } else{
            xImage = <img className="profile-photo-sm pull-left" src={`/posts/images/${post.image}`} alt="tet" />
        }
        
        return (
            <div className="follow-user">
                {xImage}
                <div>
                    <Link to={`/track/${post.id}`} className="profile-link"><h4>#{index}: {post.title}</h4></Link>
                    <Link to={`/my.profile/${post.uid}`} className="profile-link">{post.first_name} {post.last_name}</Link>
                    <p className="text-green">View: {post.view}</p>
                </div>
            </div>
        );
    }
}

export default BxhTop10;