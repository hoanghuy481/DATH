import React , { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { countPosts, countFollowers} from '../components/api/UserFuncions';
import { createFollow, unFollow, getFollowing } from '../components/api/FollowerFuntion';

class Followers extends Component {
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
        this.getCountPosts(this.props.userFollow.id);
        this.getCountFollowers(this.props.userFollow.id);
        this.getUserFollowing(this.props.myuser.id);
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.userFollow.id !== this.props.userFollow.id)
        {
            this.getUserFollowing(this.props.userFollow.id);
        }   
        if(prevState.userFollowing !== this.state.userFollowing){
           if(this.state.userFollowing.findIndex(x=>x.uid === this.props.userFollow.uid) === -1){
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
        unFollow(this.props.myuser.id, this.props.userFollow.id).then(res => {
            this.getUserFollowing(this.props.userFollow.id)
            this.getCountFollowers(this.props.userFollow.id);
            this.setState({
                setFollow: !this.state.setFollow
            })
        })      
    }
   
    HandleFollow = (e) => {
		e.preventDefault()
		const followers = {
            users_id: this.props.myuser.id,
			user_follow_id: this.props.userFollow.id
		}
		createFollow(followers).then(res => {
            this.getUserFollowing(this.props.myuser.id)
            this.getCountFollowers(this.props.userFollow.id);
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
        let {countPosts, countFollowers,setFollow} = this.state
        let user = {id: '', first_name: '', last_name: '', avatar: '', uid: ''}
        user = (this.props.userFollow !== undefined) ? this.props.userFollow : user; 
        let trueButtonFollow = <button onClick={this.HandleFollow} type="submit" className="pull-right btn-primary">Follow</button>
        if(setFollow === false){
            trueButtonFollow = <button onClick={this.HandleUnfollow} type="submit" className="pull-right btn-warning">Following</button>
        }
        let xhtmButtonlFollow = null; 
        if(this.props.myuser.uid !== user.uid){
            xhtmButtonlFollow = trueButtonFollow
        }
        
        return (            
            <div className="col-md-6 col-sm-6">
                <div className="friend-card">
                    <img src="images/covers/1.jpg" alt="profile-cover" className="img-responsive cover" />
                    <div className="card-info">
                        <img src={`/images/users/${user.avatar}`} alt="user" className="profile-photo-lg" />
                        <div className="friend-info">
                            {xhtmButtonlFollow}
                            <h5><Link to={`/my.profile/${user.uid}`} className="profile-link">{user.first_name} {user.last_name}</Link></h5>
                            <Link to={`/followers/${user.uid}`}><p>Followers: {countFollowers}</p></Link>
                            <p>Tracks: {countPosts}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        myuser: state.user
    }
}

export default connect(mapStateToProps,null)(Followers);