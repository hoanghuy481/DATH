import React , { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

import Menu from '../components/TimelinePage/Menu';
import Activity from '../components/TimelinePage/Activity';
import Playlist from '../components/PlaylistPage/Playlist';
import { getPlaylistDetail } from '../components/api/PlaylistFuntion';
class PlaylistPageDetail extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            user : {
                id:'', email: '', first_name: '', last_name: '', created: '', avatar:''	, uid:''
            },
            playlist: {},
            errors: {}
        }
    }
    
    async componentDidMount(){
        this._isMounted = true;
        let {match} = this.props;
        let id 		= match.params.id;
        await this.getPlaylist(id);
    }
    async componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id)
        {
            await this.getPlaylist(this.props.match.params.id);
        }  
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    getPlaylist = async (id) =>{
        if(this._isMounted){
            await getPlaylistDetail(id).then(data => {
                if(data === 'post does not exist'){
                    alert(data);
                    this.props.history.push('../')
                }else{
                    this.setState({
                        user: data.user,
                        playlist: data.playlist
                    })  
                }
            }) 
        }   

    }
    render(){
        let {user, playlist} = this.state;
        let {isLogin} = this.props;

        if(isLogin.isLogin === false) {
            return <Redirect to="/login" />;
        }
        
        return (
            <div className="timeline">
               <Menu user={user} getRe={this.getPlaylist} />
                <div id="page-contents">
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-7">
                        <div className="create-post"> <div className="row"></div></div>
                            {/* Post Create Box End*/}
                            <Playlist user={user} playlist={playlist} getPlaylist={this.getPlaylist}/>	
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

export default withRouter(connect(mapStateToProps, null)(PlaylistPageDetail));


