import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Menu from '../components/TimelinePage/Menu';
import Activity from '../components/TimelinePage/Activity';
import Followers from '../components/Followers';
import { getFollowers } from './../components/api/FollowerFuntion';
import { getAnotherUser } from '../components/api/UserFuncions';

class FollowersPage extends Component {
    constructor() {
        super()
        this.state = {
            usersFollowers:[],
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
            this.getUserFollowers(this.state.user.id)
        }
        
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.match.params.uid !== this.props.match.params.uid)
        {
            this.getUser(this.props.match.params.uid);
        } 
        if(prevState.user.id !== this.state.user.id)
        {
            this.getUserFollowers(this.state.user.id);
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
    getUserFollowers = (id) => {            
        if(id !== ''){
            if(this._isMounted){
                getFollowers(id).then(data => {
                    this.setState(
                        {
                            usersFollowers: [...data.data],
                        }
                    )
                })
            }
        }   
    }
    render(){
        
        let user = this.state.user;
        let {isLogin} = this.props;	
        let{usersFollowers} = this.state;
        let xhtmlUsersFollowers= null;
        let FollowersCount = 0
        if(usersFollowers.length > 0){
            FollowersCount = usersFollowers.length       
        }
        if (isLogin !== null){
            if(isLogin.isLogin === false) {
                return <Redirect to="/login" />;
            }
        }

        if(usersFollowers.length > 0){
            xhtmlUsersFollowers = usersFollowers
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
                                    {xhtmlUsersFollowers}
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


export default connect(mapStateToProps,null)(FollowersPage);