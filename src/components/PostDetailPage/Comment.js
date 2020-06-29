import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import ModalDeleteComment from './Modal/ModalDeleteComment';
import { deleteComment } from '../api/CommentFuntion';

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            postes: [],
            errors: {}
        }
    }
    HandleDelete = (cid) => {
        deleteComment(cid).then(res => {
            this.props.getCmtAll(this.props.uidPost.id)
            
        })  
        
    };
    render(){
        let item ={ id: '', comment: '', created: '', post_id:'', user_id:'', uid:'' }
        item = this.props.comment !== null ? this.props.comment : item;
        let xhtmlDelete = null
        let uid = this.props.uidPost.id_user
        
        if(this.props.myuser.id === this.props.uidPost.id_user || this.props.myuser.uid === item.uid ){
               xhtmlDelete =   <div className="post-delete-comment">
                                    <a className="btn text-red" data-toggle="modal" data-dismiss="modal" href={`#modal-${item.id}`}>
                                        <i className="fa fa-trash"/>
                                    </a>                                         
                                    <ModalDeleteComment uid={uid} HandleDelete={this.HandleDelete} comment={item} /> 
                                </div>
        }
        return (          
            <div className="post-comment">
                <Link to={`/my.profile/${item.uid}`} data-dismiss="modal" >
                    <img src={`/images/users/${item.avatar}`} alt="" className="profile-photo-sm" />

                </Link>
                <p className="comment-p">
                    <Link to={`/my.profile/${item.uid}`} data-dismiss="modal" className="profile-link">
                        {item.first_name} {item.last_name}
                    </Link> {item.comment}
                </p>
                {xhtmlDelete}
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        myuser: state.user
    }
}

export default connect(mapStateToProps,null)(Comment);
