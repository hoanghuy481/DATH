import React , { Component } from 'react';
import {Redirect, Link, withRouter, useHistory} from 'react-router-dom'
import {connect} from 'react-redux';
import { orderBy } from 'lodash';

import { getAnotherUser } from '../components/api/UserFuncions';
import { getPost } from '../components/api/PostFuncions'

import PostContent from '../components/TimelinePage/PostContent';
import Menu from '../components/TimelinePage/Menu';
import Activity from '../components/TimelinePage/Activity';


class TimelinePage extends Component {
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
        this.getAll(this.state.user.id)
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
    
    componentWillUnmount(){
        this._isMounted = false;
    }
    getAll = (id) => {            
        if(id !== ''){
            if(this._isMounted){
                getPost(id).then(data => {
                    this.setState(
                        {
                            posts: [...data],
                        }
                    )
                }) 
            }
        }     
    } 
    getUser = async (id) =>{
        let datas = null
        await getAnotherUser(id).then(data => {
            if (this._isMounted){
                if(data === 'User does not exist'){
                    alert(data);
                    this.props.history.push('../')
                }else{
                    datas = data
                }		
            }     
        })		
        await this.setState({
            user: datas
        }) 
    } 
    render(){
        let {isLogin, myuser} = this.props;
        let xhtml = null; 
        let xcreatebox = null;
        let {posts, user} = this.state;
        
        if(isLogin.isLogin === false) {
            return <Redirect to="/login" />;
        }
        if(myuser.uid === user.uid){
           xcreatebox =   <Link to={`/upload/${user.uid}`} className="btn btn-primary pull-right">Upload your new track here</Link>
        }
        
        if(posts.length > 0){ 
            xhtml = posts = orderBy(posts, ['id'],['desc'])
            .map((post, i)=> {         
                return (
                    <PostContent user={user} key={i} index={i} post={post} getRe={this.getAll}/>	
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
                            <div className="create-post">
                                <div className="row">
                                    <div className="Upload" style={{display:`flex`}}>
                                        <div className="btnUpload" style={{margin:`auto`}}>
                                           {xcreatebox}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        myuser: state.user,
        isLogin: state.isLogin
    }
}

export default withRouter(connect(mapStateToProps, null) (TimelinePage))