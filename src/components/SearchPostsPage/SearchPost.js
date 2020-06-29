import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ModalAddPlaylist from '../TimelinePage/Modal/ModalAddPlaylist'

class SearchPost extends Component {
    constructor() {
        super()
        this.state = {

            errors: {}
        }
    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps,prevState){
      
    }
   
    render(){
        let {post} = this.props
        
        return (          
            <div>
                <div className="row">
                    <div className="col-md-2 col-sm-2">
                        <img src={`/posts/images/${post.image}`}alt="user" className="profile-photo-lg" />
                    </div>
                    <div className="col-md-6 col-sm-7">
                        <h5><Link to={`/track/${post.id}`} className="profile-link">{post.title}</Link></h5>
                        <p>People: <Link to={`/my.profile/${post.uid}`} className="profile-link">{post.first_name} {post.last_name}</Link></p>
                         <p className="text-muted">View: {post.view} </p>
                    </div>
                    <div className="col-md-4 col-sm-3">
                        <button data-toggle="modal" href={`#modalAdd-${post.id}`} type="button" className="btn-primary">Add to playlist</button>
                        <ModalAddPlaylist post={post} />
                    </div>
                    
                </div>
                <div className="line-divider" />
            </div>  
            
        );
    }
}


const mapStateToProps = state => {
    return{
        myuser: state.user,
    }
}


export default connect(mapStateToProps,null)(SearchPost);