import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SidebarRight from '../components/HomePage/SidebarRight';
import SidebarSearch from '../components/SidebarSearch';
import SearchUser from '../components/SearchUsersPage/SearchUser';
import { searchUser } from '../components/api/UserFuncions';
import SearchPost from '../components/SearchPostsPage/SearchPost';
import { searchPost } from '../components/api/PostFuncions';

class SearchPage extends Component {
    
    constructor() {
        super()
        this.state = {
            users: [],
            posts: [],
            numberOfitemsShown: 2,
            errors: {}
        }
    }
    
    componentDidMount(){
        let search = this.props.match.params
        this.searchUser(search.search);
        this.searchPost(search.search);
        this.setState({
            query: this.props.match.params.search
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.search !== this.props.match.params.search)
        {
            this.searchUser(this.props.match.params.search);
            this.searchPost(this.props.match.params.search);
            this.setState({
                query: this.props.match.params.search
            })
        } 
    }

    searchUser = (search) =>{
        searchUser(search).then(data =>{
            this.setState({
                users: [...data.data]
            })
        })
        
    }
    searchPost = (search) =>{
        searchPost(search).then(data =>{
            this.setState({
                posts: [...data.data]
            })
        })
        
    }

    render(){
        let search = this.props.match.params.search
        let {users,query, posts} = this.state;
        let {isLogin} = this.props;	
        let xUsers = null; let xPosts = null;
        if (isLogin !== null){
            if(isLogin.isLogin === false) {
                return <Redirect to="/login" />;
            }
        }
        if(users.length > 0){ 
            xUsers = users 
            .map((user, i)=> {         
                return (
                    <SearchUser user={user} key={i} index={i}  search={search} getRe={this.searchUser}/>	
                );
            });
        }
        if(posts.length > 0){ 
            xPosts = posts 
            .map((post, i)=> {         
                return (
                    <SearchPost post={post} key={i} index={i}  search={search} getRe={this.searchPost}/>	
                );
            });
        }
        let xhtml = <div className="col-md-7">
                        <div className="create-post">
                            <h2>Search results for "{query}"</h2>
                        </div>
                        <h2>Tracks: </h2>
                        <div className="line-divider" /> 
                        {xPosts}
                        <h2>People: </h2>
                        <div className="line-divider" /> 
                        {xUsers}
                    </div>
        if (users.length === 0 && posts.length === 0){
            xhtml =  <div className="col-md-7">
                        <div className="create-post">
                            <h2>Sorry we didn't find any results for "{query}"</h2>
                        </div>
                    </div>
        }
    
        return (            
            <div className="row">
                <SidebarSearch query={query}/>   
                {xhtml}
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


export default connect(mapStateToProps,null)(SearchPage);