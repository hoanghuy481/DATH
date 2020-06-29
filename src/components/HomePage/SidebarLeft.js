import React , { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

class SidebarLeft extends Component {
   
    render(){
        let user = this.props.MyUser;
        return (
            <div className="col-md-3 static">
                <div className="profile-card">
                    <img src={`/images/users/${user.avatar}`} alt="user" className="profile-photo" />
                    <h5><Link to={`/my.profile/${user.uid}`} className="text-white">{user.first_name + " " + user.last_name}</Link></h5>
                    <Link to={`/followers/${user.uid}`} className="text-white"><i className="ion ion-android-person-add" /> {this.props.FollowersCount} followers</Link>
                </div>
                {/*profile card ends*/}
                <ul className="nav-news-feed">
                    <li>
                        <i className="icon ion-ios-paper" />
                        <div><Link to={`../list-playlist/${user.uid}`}>My Playlist</Link></div>
                    </li>
                    <li>
                        <i className="icon ion-ios-people" />
                        <div><Link to={`../followers/${user.uid}`}>Followers</Link></div>
                    </li>
                    <li>
                        <i className="icon ion-ios-people-outline" />
                        <div><Link to={`../following/${user.uid}`}>Following</Link></div>
                    </li>
                    <li>
                        <i className="icon ion-chatboxes" />
                        <div><Link to={`../about/${user.uid}`}>About Me</Link></div>
                    </li>
                    <li>
                        <i className="icon ion-ios-videocam" />
                        <div><Link to={`../upload/${user.uid}`}>Upload Track</Link></div>
                    </li>
                </ul>
                {/*news-feed links ends*/}
            </div>
          );
    }
}

const mapStateToProps = state => {
    return{
        MyUser: state.user
    }
}


export default connect(mapStateToProps,null)(SidebarLeft);