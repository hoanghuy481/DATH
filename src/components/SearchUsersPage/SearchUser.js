import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { countPosts, countFollowers} from '../api/UserFuncions';
import { createFollow, unFollow, getFollowing } from '../api/FollowerFuntion';

class SearchUser extends Component {
    constructor() {
        super()
        this.state = {
            countPosts: '',
            countFollowers:'',
            userFollowing: [],
            setFollow: true,
            errors: {}
        }
    }
    componentDidMount(){
        this.getCountPosts(this.props.user.id);
        this.getCountFollowers(this.props.user.id);
        this.getUserFollowing(this.props.myuser.id);
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.user.id !== this.props.user.id)
        {
            this.getUserFollowing(this.props.myuser.id);
        }   
        if(prevState.userFollowing !== this.state.userFollowing){
           if(this.state.userFollowing.findIndex(x=>x.uid === this.props.user.uid) === -1){
                this.setState({
                    setFollow: true
                })
            }else{
                this.setState({
                    setFollow: false
                })
            }            
        }
    }
    HandleUnfollow = (e) =>{
        e.preventDefault()
        unFollow(this.props.myuser.id, this.props.user.id).then(res => {
            this.getUserFollowing(this.props.myuser.id);
            this.getCountFollowers(this.props.user.id);
            this.setState({
                setLike: true
            })
        })      
    }
   
    HandleFollow = (e) => {
		e.preventDefault()
		const followers = {
            users_id: this.props.myuser.id,
			user_follow_id: this.props.user.id
		}
		createFollow(followers).then(res => {
            this.getUserFollowing(this.props.myuser.id);
           this.getCountFollowers(this.props.user.id);
        })     
    }
    
    getCountPosts = (id) =>{
        countPosts(id).then(data =>{
            this.setState({
                countPosts: data.data[0].tracks
            })
        })
    }
    getCountFollowers = (id) =>{
        countFollowers(id).then(data =>{
            this.setState({
                countFollowers: data.data[0].followers
            })
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
    render(){
        let {user} = this.props
        let {countPosts, countFollowers,setFollow} = this.state
        let trueButtonFollow = <button onClick={this.HandleFollow} type="submit" className="btn-primary">Follow</button>
        if(setFollow === false){
            trueButtonFollow = <button onClick={this.HandleUnfollow} type="submit" className="btn-warning">Following</button>
        }
        let xhtmButtonlFollow = null; 
        if(this.props.myuser.uid !== user.uid){
            xhtmButtonlFollow = trueButtonFollow
        }
        return (          
            <div>
                <div className="row">
                    <div className="col-md-2 col-sm-2">
                        <img src={`images/users/${user.avatar}`}alt="user" className="profile-photo-lg" />
                    </div>
                    <div className="col-md-7 col-sm-7">
                        <h5><Link to={`/my.profile/${user.uid}`} className="profile-link">{user.first_name} {user.last_name}</Link></h5>
                        <p>Tracks: {countPosts}</p>
                        <p className="text-muted">Followers: {countFollowers}</p>
                    </div>
                    <div className="col-md-3 col-sm-3">
                        {xhtmButtonlFollow}
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


export default connect(mapStateToProps,null)(SearchUser);