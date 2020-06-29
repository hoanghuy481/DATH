import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

import { getAnotherUser } from '../components/api/UserFuncions';
import { getPost } from '../components/api/PostFuncions'
import Menu from '../components/TimelinePage/Menu';
import PostContent from '../components/TimelinePage/PostContent';
import Activity from '../components/TimelinePage/Activity';

class AnotherUserPage extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            user : {
                id:'', email: '', first_name: '', last_name: '', created: '', avatar:''	, uid:''
            },
            posts: [],
            errors: {}
        }
    }
    componentDidMount(){
        this._isMounted = true;
        let {match} = this.props;
        let uid 		= match.params.uid;
        this.getUser(uid);
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.user.id !== this.state.user.id)
        {
            this.getAll(this.state.user.id) 
        } 
        if(prevProps.match.params.uid !== this.props.match.params.uid)
        {
            this.getUser(this.props.match.params.uid);
        } 
    }
    componentWillUnmount() {
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
    getAll = (id) => {            
        if(id !== ''){
            getPost(id).then(data => {
                this.setState(
                    {
                        posts: [...data],
                    }
                )
            })  
        }     
    } 
    render(){
        let {match} = this.props;
        let uid 		= match.params.uid;
        if (this.props.myuser.uid === uid){
            return <Redirect to={`/my.profile/${this.props.myuser.uid}`}/>
        }
        let {user} = this.state;
        let xhtml = null;
        let {posts} = this.state;
        if(posts.length > 0){
            xhtml = posts
            .sort((a,b) => b.id - a.id)
            .map((post, i)=> {         
                return (
                    <PostContent user={user} key={i} index={i} post={post} getRe={this.getAll}/>	
                );
            });
        }

        return (
            <div className="timeline">
                <Menu user={user} getRe={this.getAll}/>
                <div id="page-contents">
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-7">
                            {/* Post Create Box
                            ================================================= */}
                            <div className="create-post"></div>
                            {/* Post Create Box End*/}
                            {/* Post Content  {xhtml} <Popup/>
                            ================================================= */}
                            {xhtml}  
                        </div>
                       <Activity user={user}/>
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

export default withRouter(connect(mapStateToProps,null)(AnotherUserPage));
