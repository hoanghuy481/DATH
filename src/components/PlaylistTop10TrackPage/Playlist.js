import React , { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import TimeSlider from "react-input-slider";

import Tracks from './Tracks'
import ModalDelete from './Modal/ModalDelete'
import { deletePlaylist } from '../api/PlaylistFuntion';
import { updateView, get10Post} from '../api/PostFuncions';
import {PrevIcon,PauseIcon,PlayIcon,NextIcon} from "./../../icons";
class Playlist extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.audioRef = React.createRef();
        this.state = {
            tracks: [],
            errors: {},
            audioIndex: 0,
            currentTime: 0,
            duration: 0,
            isPlay: false
        }
    }
    componentDidMount(){
        this._isMounted = true;
        if(this.props.playlist.id !== undefined){
            this.getAll(this.props.playlist.id);
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.playlist.id !== this.props.playlist.id)
        {
            this.getAll(this.props.playlist.id);
        } 
        if(prevState.currentTime !== this.state.currentTime)
        {
            if(this.audioRef.current.duration === this.state.currentTime){
                let a = (this.state.audioIndex + 1) % this.state.tracks.length
                this.setNext(a)
            }
        } 
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    getAll = () => {       
        if(this._isMounted){
            get10Post().then(data => {
                this.setState(
                    {
                        tracks: data.data
                    }
                )
            }) 
        }
    } 

    HandleDelete = (uid, id) => {
        deletePlaylist(uid, id).then(res => {
            this.props.getPlaylist(uid)
        })      
    };
    handleClickPlay = (index) =>{
        this.setState({
            audioIndex: index
        })
        if(!this.state.isPlay) this.handlePausePlayClick()
        
    }
    handleLoadedData = () => {
        let {isPlay} = this.state
        this.setState({
            duration:  this.audioRef.current.duration
        });
        if (isPlay) this.audioRef.current.play();
    };
    handlePausePlayClick = () => {
        let {isPlay,audioIndex,tracks} = this.state
        if (isPlay) {
            this.audioRef.current.pause();
        } else {
            this.audioRef.current.play();
            updateView(tracks[audioIndex].id, tracks[audioIndex].view)
        }
        this.setState({
            isPlay:  !isPlay
        });

    };
    handleTimeSliderChange = ({ x }) => {
        let {isPlay} = this.state
        this.audioRef.current.currentTime = x;
        this.setState({
            currentTime: x
        })
        if (!isPlay) {
            this.setState({
                isPlay:  true
            });
            this.audioRef.current.play();
        }
        
    };
    setPrev = (a) =>{
        let {audioIndex}= this.state
        if(audioIndex > 0)
        {
            this.setState({audioIndex: a})
        } else if(audioIndex ===0){
            this.setState({
                currentTime: 0,
            })
            this.audioRef.current.currentTime = 0;
        }
    }
    setNext = (a) =>{
        let {tracks}= this.state
        if(a <= tracks.length)
        {
            this.setState({audioIndex: a})
        } else {
            this.setState({
                currentTime: 0,
            })
            this.audioRef.current.currentTime = 0;
        }
    }
    render(){
        let item ={id: '',title: '',users_id: '',created:'' }
        item = this.props.playlist !== null ? this.props.playlist : item;
        let {user} = this.props;    let { tracks,isPlay,duration,currentTime,audioIndex } = this.state;
        let xhtmlDelete = null;     let xhtmlTrack = null
        if(this.props.myuser.uid === this.props.match.params.uid){
             xhtmlDelete = <div className="reaction">
                                <a className="btn text-red" data-toggle="modal" data-dismiss="modal" href={`#modal-${item.id}`}>
                                    <i className="fa fa-trash"/> delete
                                </a>                                         
                                <ModalDelete HandleDelete={this.HandleDelete} playlist={item} /> 
                            </div>
        }
        if(tracks.length > 0){
            xhtmlTrack = tracks.sort((a, b) =>a - b)
            .map((track, i)=> {         
                return (
                    <Tracks key={i} index={i} handleClickPlay={this.handleClickPlay} getTracklist={this.getAll}
                    playlist={item} user={user} track={track} audioIndex={audioIndex} />	
                );
            });
        }
        console.log();
        
        let track = null;
        if(tracks[audioIndex] !== undefined)
        {
            track = tracks[audioIndex].audio
        }
        let xbutton = null;
        if(tracks.length > 0){
            xbutton = <div className="img-audio-post">
                        <TimeSlider axis="x" xmax={duration} x={currentTime} onChange={this.handleTimeSliderChange}
                            styles={{
                                track: {
                                    backgroundColor: "#e3e3e3",
                                    height: "2px",
                                },
                                active: {
                                    backgroundColor: "#333",
                                    height: "2px",
                                },
                                thumb: {
                                    marginTop: "-3px",
                                    width: "8px",
                                    height: "8px",
                                    backgroundColor: "#333",
                                    borderRadius: 0,
                                },
                            }}
                        />
                        <audio ref={this.audioRef}
                            src={`/posts/audio/${track}`}
                            onLoadedData={this.handleLoadedData}
                            onTimeUpdate={() => this.setState({currentTime: this.audioRef.current.currentTime})}
                            onEnded={() => this.setState({isPlay: false})}
                        />
                        <div className="Control-Button-Group">
                            <div className="Prev-Button" onClick={()=> this.setPrev((audioIndex - 1) % tracks.length)}>
                                <PrevIcon />
                            </div>
                            <div className="Pause-Play-Button" onClick={this.handlePausePlayClick}>
                                {isPlay ? <PauseIcon /> : <PlayIcon />}
                            </div>
                            <div className="Next-Button" >
                                <NextIcon onClick={()=> this.setNext((audioIndex + 1) % tracks.length)}/>
                            </div>
                        </div>
                    </div>
        }
        
        return (         
            <div className="post-content">
                <div className="post-date hidden-xs hidden-sm">
                    <h5>{user.first_name} {user.last_name}</h5>
                    <p className="text-grey">{item.created}</p>
                </div>
                <div className="post-container">
                    <img src={`/images/users/${this.props.user.avatar}`} alt="user" className="profile-photo-md pull-left" />
                    <div className="post-detail">
                        <div className="user-info">
                            <h5><Link to={`/profile/${user.uid}`} className="profile-link">{user.first_name} {user.last_name}</Link> <span className="following">following</span></h5>
                            <p className="text-muted">{item.created}</p>
                        </div>
                        {xhtmlDelete}
                        <div className="line-divider" />
                        <div className="img-title-playlist">
                            <h2><Link to={`../playlist/${item.id}`}>{item.title}</Link></h2>
                        </div>                        
                        {xhtmlTrack}
                        <div className="line-divider" />
                        {xbutton}
                    </div>
                </div>
            </div>
    );
    }
}

const mapStateToProps = state => {
    return {
        myuser: state.user,
    }
}

export default withRouter(connect(mapStateToProps, null)(Playlist));
