import React , { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import { orderBy } from 'lodash';

import Menu from '../components/TimelinePage/Menu';
import Activity from '../components/TimelinePage/Activity';
import CreateBox from '../components/PlaylistPage/CreateBox';
import Playlist from '../components/PlaylistPage/Playlist';
import { getAnotherUser } from '../components/api/UserFuncions';
import { getPlaylist } from '../components/api/PlaylistFuntion';
import { actGetPlaylist } from './../actions/index';
class PlaylistPage extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            user : {
                id:'', email: '', first_name: '', last_name: '', created: '', avatar:''	, uid:''
            },
            Playlists: [],
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
        if(prevState.user.id !== this.state.user.id)
        {
            this.getPlaylist(this.state.user.id);
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
    getPlaylist = async (id) =>{
        let playlists = null
            if(this._isMounted){
                await getPlaylist(id).then(data => {
                    playlists = [...data]
                }) 
            }   
            await this.setState(
                {
                    Playlists: playlists
                }
            )
            await this.props.playlists(playlists)

    }
    render(){
        let {user, Playlists} = this.state;
        let {isLogin,myuser} = this.props;
        let xhtml = null; let xcreatebox = null;
        if(myuser.uid === user.uid){
             xcreatebox = <CreateBox user={user} getPlaylist={this.getPlaylist}/>
        }else {
            xcreatebox = <div className="create-post"> <div className="row"></div></div>
        }
        if(isLogin.isLogin === false) {
            return <Redirect to="/login" />;
        }
        if(Playlists.length > 0){
            xhtml = Playlists = orderBy(Playlists, ['id'],['desc'])
            .map((playlist, i)=> {         
                return (
                    <Playlist user={user} key={i} index={i} playlist={playlist} getPlaylist={this.getPlaylist}/>	
                );
            });
        }
        
        return (
            <div className="timeline">
               <Menu user={user} getRe={this.getPlaylist} getU={this.getUser} />
                <div id="page-contents">
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-7">
                            {/* Post Create Box
                            ================================================= */}
                            {xcreatebox}
                            {/* Post Create Box End*/}
                            {xhtml}
                            {/* Post Content  {xhtml} <Popup/>
                            ================================================= */}
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
        isLogin: state.isLogin,
        playlists: state.playlists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        playlists: (playlists) =>{
            dispatch(actGetPlaylist(playlists));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistPage));


