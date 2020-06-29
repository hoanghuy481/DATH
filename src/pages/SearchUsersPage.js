import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SidebarRight from '../components/HomePage/SidebarRight';
import SidebarSearch from '../components/SidebarSearch';
import SearchUser from '../components/SearchUsersPage/SearchUser';
import { searchUser } from '../components/api/UserFuncions';

class SearchUsersPage extends Component {
    
    constructor() {
        super()
        this.state = {
            users: [],
            errors: {}
        }
    }
    
    componentDidMount(){
        let search = this.props.match.params
        this.searchUser(search.search);
        this.setState({
            query: this.props.match.params.search
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.search !== this.props.match.params.search)
        {
            this.searchUser(this.props.match.params.search);
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
   
    render(){
        let search = this.props.match.params.search
        let {users,query} = this.state;
        let {isLogin} = this.props;	
        let xhtml = null;
        if (isLogin !== null){
            if(isLogin.isLogin === false) {
                return <Redirect to="/login" />;
            }
        }
        
        if(users.length > 0){ 
            xhtml = users 
            .map((user, i)=> {         
                return (
                    <SearchUser user={user} key={i} index={i} search={search} getRe={this.searchUser}/>	
                );
            });
        }
        let xsearch =  <div className="col-md-7">
                            <div className="create-post">
                                <h2>Search results for "{query}"</h2>
                            </div>
                            {xhtml}
                        </div>
        
        if(users.length === 0){
            xsearch = <div className="col-md-7">
                        <div className="create-post">
                            <h2>Sorry we didn't find any results for "{query}"</h2>
                        </div>
                    </div>
        }
        
        return (            
            <div className="row">
                <SidebarSearch query={query}/>   
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


export default connect(mapStateToProps,null)(SearchUsersPage);