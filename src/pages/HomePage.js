import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect, Link, withRouter} from 'react-router-dom';
import { orderBy } from 'lodash';

import { getUserPost, getPostByFollowing } from '../components/api/PostFuncions'

import Index from '../components/HomePage/Index';
import SidebarLeft from '../components/HomePage/SidebarLeft';
import SidebarRight from '../components/HomePage/SidebarRight';

class HomePage extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            posts: [],
            errors: {},
            isFormSubmitted: true
        }
    }
    async componentDidMount(){
        this._isMounted = true;
        await this.getAll(this.props.user.id)
    }
  
    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id)
        {
            this.getAll(this.props.user.id)
            
        } 
        if (prevProps.location.key !== this.props.location.key) {
            window.scrollTo(0, 0);
            this.getAll(this.props.user.id)
            window.location.reload()
        }
    }
 
    componentWillUnmount(){
        this._isMounted = false;
        this.setState = (state,callback)=>{
            return;
        };
    }
    
    getAll = async (id) => {    
        let posts = null   
        if(id !== ''){
            if(this._isMounted){
                await getPostByFollowing(id).then(data => {
                    posts = [...data.data]
                    
                }) 
                await getUserPost(id).then(data => {
                    posts.push(...data.data)
                }) 
                await this.setState({
                    posts: posts
                })
            }
        }     
    } 

    isLogin(){
        let {isLogin} = this.props;
        if(isLogin.isLogin === true) {
			return <SidebarLeft user={this.props.user}/>;
        }
    } 
    render(){
        let {isLogin, user} = this.props;
        let xhtml = null; 
        let {posts} = this.state;
        
        if(isLogin.isLogin === false) {
            return <Redirect to="/login" />;
        }
        if(posts.length > 0){ 
            xhtml = posts = orderBy(posts, ['id'],['desc'])
            .map((post, i)=> {         
                return (
                    <Index key={i} index={i} post={post} getRe={this.getAll}/>	
                );
            });
        }
        
        return (            

            <div className="row">
                {this.isLogin()}
                <div className="col-md-7">
                    <div className="create-post">
                        <div className="row">
                            <div className="Upload" style={{display:`flex`}}>
                                <div className="btnUpload" style={{margin:`auto`}}>
                                    <Link to={`/upload/${user.uid}`} className="btn btn-primary pull-right">Upload your new track here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {xhtml}
                </div>
                <SidebarRight user={user}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        user: state.user,
        isLogin: state.isLogin
    }
}

export default withRouter(connect(mapStateToProps,null)(HomePage));