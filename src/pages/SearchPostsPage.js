import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import SidebarSearch from '../components/SidebarSearch';
import SidebarRight from '../components/HomePage/SidebarRight';
import SearchPost from '../components/SearchPostsPage/SearchPost';
import { searchPost } from '../components/api/PostFuncions';


class SearchPostsPage extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            errors: {}
        }
    }
    componentDidMount(){
        let search = this.props.match.params
        this.searchPost(search.search);
        this.setState({
            query: this.props.match.params.search
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.search !== this.props.match.params.search)
        {
            this.searchPost(this.props.match.params.search);
            this.setState({
                query: this.props.match.params.search
            })
        } 
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
        let {posts,query} = this.state;
        let {isLogin} = this.props;	
        let xhtml = null;
        if (isLogin !== null){
            if(isLogin.isLogin === false) {
                return <Redirect to="/login" />;
            }
        }

        
        if(posts.length > 0){ 
            xhtml = posts 
            .map((post, i)=> {         
                return (
                    <SearchPost post={post} key={i} index={i}  search={search} getRe={this.searchPost}/>	
                );
            });
        } 
        let xsearch = <div className="col-md-7">
                        <div className="create-post">
                            <h2>Search results for "{query}"</h2>
                        </div>
                        {xhtml}
                    </div>
        if(posts.length === 0) {
            xsearch = <div className="col-md-7">
                        <div className="create-post">
                            <h2>Sorry we didn't find any results for "{query}"</h2>
                        </div>
                    </div>
        }
        
        
        return (            
            <div className="row">
                <SidebarSearch query={query} />    
                {xsearch}
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


export default connect(mapStateToProps,null)(SearchPostsPage);