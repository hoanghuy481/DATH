import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Link } from "react-router-dom";
import { orderBy } from 'lodash';
import moment from 'moment';

import { createFollow, unFollow, getFollowing } from '../../api/FollowerFuntion';
class ModalLikes extends Component {
    constructor() {
        super()
        this.state = {
            countFollowers:'',
            userFollowing: [],
            errors: {}
        }
    }
    componentDidMount(){
        this.getUserFollowing(this.props.myuser.id);
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }
    componentDidUpdate(prevProps){
        if(prevProps.post.id !== this.props.post.id)
        {
            this.getUserFollowing(this.props.myuser.id);
        }   

    }
    HandleUnfollow = (id) =>{
        unFollow(this.props.myuser.id, id).then(res => {
            this.getUserFollowing(this.props.myuser.id);
            this.setState({
                setLike: true
            })
        })      
    }
   
    HandleFollow = (id) => {
		const followers = {
            users_id: this.props.myuser.id,
			user_follow_id: id
		}
		createFollow(followers).then(res => {
            this.getUserFollowing(this.props.myuser.id);
        })     
    }

    getUserFollowing = (id) =>{
        if(id !== ''){
            getFollowing(id).then(data => {
                this.setState({
                    userFollowing: [...data.data]
                })
            })
        }
    }
    showUsers = (likes) =>{
        
        let xUsers = null
        if(likes.length > 0){
            xUsers = likes =  orderBy(likes, ['id'],['desc'])
            .map((like, index) =>{
                let now = moment(like.created).endOf('hour').fromNow();
                let xhtmButtonlFollow = 'This is you'; 
                let trueButtonFollow =   <button onClick={()=>this.HandleUnfollow(like.users_id)} type="submit" className="btn-warning">Following</button>
                if(this.state.userFollowing.findIndex(x=>x.uid === like.uid) === -1){
                    trueButtonFollow = <button onClick={()=>this.HandleFollow(like.users_id)} type="submit" className="btn-primary">Follow</button>
                    
                } 
                if(this.props.myuser.uid !== like.uid){
                    xhtmButtonlFollow = trueButtonFollow
                } 
                
                    return(
                        <div key={index} className="follow-user">
                            <img src={`/images/users/${like.avatar}`} alt="user" className="profile-photo-sm pull-left" />
                            <div>
                                <h5><Link to={`/my.profile/${like.uid}`} className="profile-link">{like.first_name} {like.last_name}</Link></h5>
                                {xhtmButtonlFollow}
                                <p className="noti-p">{now}</p>
                            </div>
                        </div>
                    )
            })
        }
        return xUsers
    }

    render(){      
        let {likes} = this.props;        
        let item ={ id: '', post: '', image: '',videos:'',like:'',id_user:'',created:'',title:'',audio:'',view:''}
        item = this.props.post !== null ? this.props.post : item;
        return (
            <div id={`likes-${item.id}`} className="modal" tabIndex={-1} role="dialog" aria-labelledby="likes" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">Likes</h3>
                            <a type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </a>
                        </div>
                        <div className="modal-body">
                            {this.showUsers(likes)}
                        </div>
                        
                    </div>
                </div>
            </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        myuser: state.user
    }
}

export default connect(mapStateToProps)(ModalLikes)