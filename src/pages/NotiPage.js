import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect, Link, withRouter} from 'react-router-dom';
import { orderBy } from 'lodash';
import moment from 'moment';

import SidebarLeft from '../components/HomePage/SidebarLeft';
import SidebarRight from '../components/HomePage/SidebarRight';
import  { postsRef } from '../firebase';

class NotiPage extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            noties: [],
            errors: {},
            isFormSubmitted: true
        }
    }
    componentDidMount(){
        postsRef.on('value', items =>{
            let data = []
            items.forEach(item=>{
                const {created, myuser, posts_id, seen, title, type, users_id, users_name, comments_id} = item.val();
                data.push({created, myuser, posts_id, seen, title, type, users_id, users_name, key: item.key,comments_id} );
            })
            this.setState({noties: data})
        })
    }
  
    showNoti = (noties) =>{
        let xnoti = null
        if(noties.length > 0){
            xnoti = noties =  orderBy(noties, ['comments_id'],['desc'])
            .slice(0, 4)
            .map((noti, index) =>{
                if(noti.users_id !== this.props.user.uid){
                    let now = moment(noti.created).endOf('hour').fromNow();
                    return(
                        <div key={index} className="Noti">
                            <div className="noti-a">
                                <Link to={`/my.profile/${noti.users_id}`}>{noti.users_name} </Link>
                                {noti.type} your post:
                            </div>
                            <div className="noti-a">
                                <Link to={`/track/${noti.posts_id}`}>{noti.title}</Link>
                                <p className="noti-p">{now}</p>
                            </div>
                        </div>
                    )
                } 
            })
        }
        return xnoti
    }
   

    isLogin(){
        let {isLogin} = this.props;
        if(isLogin.isLogin === true) {
			return <SidebarLeft user={this.props.user}/>;
        }
    } 
    render(){
        let {isLogin, user} = this.props;
        let {noties}= this.state
        if(isLogin.isLogin === false) {
            return <Redirect to="/login" />;
        }
      
        
        return (            
            <div className="row">
                {this.isLogin()}
                <div className="col-md-7">
                    <h2>Notifications</h2>
                    <div className="row">
                        {this.showNoti(noties)}
                    </div>
                </div>
                <SidebarRight/>
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

export default withRouter(connect(mapStateToProps,null)(NotiPage));