import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Menu from '../components/TimelinePage/Menu';
import Activity from '../components/TimelinePage/Activity';
import Followers from '../components/Followers';
import { getFollowing } from './../components/api/FollowerFuntion';
import { getAnotherUser } from '../components/api/UserFuncions';

class FollowingPage extends Component {
    constructor() {
        super()
        this.state = {
            usersFollowing:[],
            user : {
                id:'', email: '', first_name: '', last_name: '', created: '', avatar:''	, uid:''
            },
            errors: {}
        }
	}
    componentDidMount(){
        let {match} = this.props;
        let uid 		= match.params.uid;
        this.getUser(uid);
        this._isMounted = true;

        if(this.state.user.id !== ''){
            this.getUserFollowing(this.state.user.id)
        }
        
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.match.params.uid !== this.props.match.params.uid)
        {
            this.getUser(this.props.match.params.uid);
        } 
        if(prevState.user.id !== this.state.user.id)
        {
            this.getUserFollowing(this.state.user.id);
        }  
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    getUser = (id) =>{
        getAnotherUser(id).then(data => {
            if (this._isMounted){
                this.setState({
                    user: data
                })  
            }     
        })			
    }  
    getUserFollowing = (id) => {            
        if(id !== ''){
            if(this._isMounted){
                getFollowing(id).then(data => {
                    this.setState(
                        {
                            usersFollowing: [...data.data],
                        }
                    )
                })
            }
        }   
    }
    render(){
        
        let user = this.state.user;
        let {isLogin} = this.props;	
        let{usersFollowing} = this.state;
        let xhtmlusersFollowing= null;
        let FollowersCount = 0
        if(usersFollowing.length > 0){
            FollowersCount = usersFollowing.length       
        }
        if (isLogin !== null){
            if(isLogin.isLogin === false) {
                return <Redirect to="/login" />;
            }
        }

        if(usersFollowing.length > 0){
            xhtmlusersFollowing = usersFollowing
            .sort((a,b) => a.id - b.id)
            .map((userFollow, i)=> {         
                return (
                    <Followers key={i} index={i} userFollow={userFollow} user={user}/>
                );
            });
        }
        
        return (            
            <div className="timeline">
                <Menu user={user} getRe={this.getAll} getU={this.getUser} />
                <div id="page-contents">
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-7">
                            {/* Post Create Box
                            ================================================= */}
                            <div className="friend-list">
                                <div className="row">
                                    {xhtmlusersFollowing}
                                </div>
                            </div>
                        </div>
                       <Activity user={user}/>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        myuser: state.user,
        isLogin: state.isLogin
    }
}


export default connect(mapStateToProps,null)(FollowingPage);