import React , { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import { getOnePost } from '../components/api/PostFuncions';
import SidebarLeft from '../components/HomePage/SidebarLeft';
import Post from '../components/PostDetailPage/Post';


class PostDetailPage extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            user : {},
            post: {},
            errors: {}
        }
    } 
    async componentDidMount(){
        this._isMounted = true;
        let {match} = this.props;
        let id 		= match.params.id;
        await this.getOnePost(id);
    }
  
    async componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id)
        {
            await this.getOnePost(this.props.match.params.id);
        } 
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
   
    getOnePost = async (id) =>{
        let user = null; let post = null;
        if(this._isMounted){
            await getOnePost(id).then(data => {
                if(data === 'post does not exist'){
                    alert(data);
                    this.props.history.push('../')
                
                }else{
                    user = data.user;
                    post = data.post;
                }
            })	
            await this.setState({
                user: user,
                post: post
            }) 	
        }	
    } 
    render(){
        let {isLogin} = this.props;
        let {post, user} = this.state;
        
        if(isLogin.isLogin === false) {
            return <Redirect to="/login" />;
        }
        
        return (
            <div className="row">
                <SidebarLeft user={user} />   
                <div className="col-md-7">
                    <div className="friend-list">
                        <div className="post-content">
                            <Post user={user} post={post} getRe={this.getOnePost} />
                        </div>
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
export default withRouter(connect(mapStateToProps, null)(PostDetailPage))