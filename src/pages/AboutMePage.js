import React , { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Menu from '../components/TimelinePage/Menu';
import Activity from '../components/TimelinePage/Activity';
import About from '../components/AboutPage/About';

import { getAnotherUser } from '../components/api/UserFuncions';

class AboutMePage extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            user : {
                id:'', email: '', first_name: '', last_name: '', created: '', avatar:''	, uid:'',bio:''
            },
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
                if(data === 'User does not exist'){
                    alert(data);
                    this.props.history.push('../')
                }else{
                    this.setState({
                        user: data
                    })   
                }		
            }     
        })	
    }
  
    render(){
        let {user } = this.state;
        let {isLogin} = this.props;
       
        if(isLogin.isLogin === false) {
            return <Redirect to="/login" />;
        }
        
        return (
            <div className="timeline">
               <Menu user={user} getU={this.getUser} />
                <div id="page-contents">
                    <div className="row">
                        <div className="col-md-3" />
                      
                            {/* Post Content  {xhtml} <Popup/>
                            ================================================= */}
                            <About getRe={this.getUser} user={user}/>
                        
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

export default withRouter(connect(mapStateToProps, null)(AboutMePage));


