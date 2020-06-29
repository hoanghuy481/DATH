import React , { Component } from 'react';
import {connect} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {withRouter, Link} from 'react-router-dom';
import "react-jinke-music-player/assets/index.css";
import TimeSlider from "react-input-slider";

import Comment from './Comment';
import ModalDelete from './Modal/ModalDelete';
import ModalAddPlaylist from './Modal/ModalAddPlaylist';
import ModalPostReport  from './Modal/ModalPostReport';
import ModalUpdatePost  from './Modal/ModalUpdatePost';
import ModalLikes  from './Modal/ModalLikes';
import { PrevIcon,PauseIcon,PlayIcon } from "./../../icons";

import { getComment,createComment } from '../api/CommentFuntion';
import { deletePost,updateView } from '../api/PostFuncions';
import { createLike, unLike, getLike } from '../api/LikeFuntion';
import  { postsRef } from '../../firebase';


class PostContentDetail extends Component {
    constructor() {
        super()
        this.audioRef = React.createRef();
        this.state = {
            comments: [],
            texts: '',
            numberOfitemsShown: 3,
            likes:[],
            setLike: true,
            errors: {},
            audioIndex: 0,
            currentTime: 0,
            duration: 0,
            isPlay: false,
            showForm: false
        }
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const newComment = {
                comment: this.state.texts,
                posts_id: this.props.post.id,
                users_id: this.props.myuser.id,
            }

            createComment(newComment).then(res => {
                this.getCmtAll(newComment.posts_id);
                let noti = {
                    posts_id: this.props.post.id,
                    users_id: this.props.myuser.uid,
                    myuser: this.props.user.uid,
                    users_name: this.props.myuser.last_name +' '+ this.props.myuser.first_name,
                    title: this.props.post.title,
                    created: res.created,
                    comments_id: res.comments_id,
                    type: 'comment',
                    seen: false
                }
                if(noti.myuser !== noti.users_id){
                    postsRef.push(noti)
                }
            })    
            this.setState({texts: ''});
        }
    }
    HandleLike = (e) =>{
        e.preventDefault()
        const newLike  ={
            posts_id:  this.props.post.id,
            users_id: this.props.myuser.id
        }
        createLike(newLike).then(res => {
            this.getLike(this.props.post.id)
            this.setState({
                setLike: false
            })
        })    
    }
    HandleUnLike = (e) =>{
        e.preventDefault()
        unLike(this.props.myuser.id, this.props.post.id).then(res => {
            this.getLike(this.props.post.id)
            this.setState({
                setLike: true
            })
        })      
    }
    HandleDelete = (uid, id) => {
        deletePost(uid, id).then(res => {
            this.props.getRe(uid)
        })      
    };
    componentDidMount(){
        this._isMounted = true;
        if(this.props.user.id !== undefined){
            this.getLike(this.props.post.id)
            this.getCmtAll(this.props.post.id)
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.post.id !== this.props.post.id)
        {
            this.getLike(this.props.post.id)
            this.getCmtAll(this.props.post.id) 
        }   
        if(prevState.likes !== this.state.likes){
            if(this.state.likes.findIndex(x=>x.uid === this.props.myuser.uid) === -1){
                this.setState({
                    setLike: true
                })
            }else{
                this.setState({
                    setLike: false
                })
            }
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    getCmtAll = (id) => {            
        if(id !== undefined){
            if(this._isMounted){
                getComment(id).then(data => {
                    this.setState(
                        {
                            comments: [...data.data],
                        }
                    )
                })
            }
        }   
    }
    getLike = (id) => {            
        if(id !== ''){
            if(this._isMounted){
                getLike(id).then(data => {
                    this.setState(
                        {
                            likes: [...data.data],
                        }
                    )
                })  
            }
        }   
    }
    showMore = () => {
        if (this.state.numberOfitemsShown + 3 <= this.state.comments.length) {
            this.setState(state => ({ numberOfitemsShown: state.numberOfitemsShown + 3 }));
        } else {
            this.setState({ numberOfitemsShown: this.state.comments.length })
        }
    }
    handleLoadedData = () => {
        let {isPlay} = this.state
        this.setState({
            duration:  this.audioRef.current.duration
        });
        if (isPlay) this.audioRef.current.play();
    };
    handlePausePlayClick = () => {
        let {isPlay} = this.state
        if (isPlay) {
            this.audioRef.current.pause();
            updateView(this.props.post.id,this.props.post.view).then(res => {
                this.props.getRe(this.props.user.id)
            })      
        } else {
            this.audioRef.current.play();
            
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
    handlePre = ()=>{
        this.audioRef.current.currentTime = 0;
        this.setState({
            currentTime: 0
        })
    }
    handleStop = ()=>{
        this.audioRef.current.currentTime = 0;
        this.audioRef.current.pause();
        this.setState({
            currentTime: 0,
            isPlay: false
        })
    }
    handleShowForm = () =>{
        let {showForm} = this.state
        this.setState({
            showForm: !showForm
        })
    }
    render(){
        let { comments, numberOfitemsShown, likes,setLike,isPlay,duration,currentTime,showForm } = this.state;  
        let {user} = this.props;        
        let item ={ id: '', post: '', image: '',videos:'',like:'',id_user:'',created:'',title:'',audio:'',view:''}
        item = this.props.post !== null ? this.props.post : item;
        let xhtmlComment = null; 
        if(comments.length > 0){
            xhtmlComment = comments
            .sort((a,b) => a.id - b.id)
            .slice(0, numberOfitemsShown)
            .map((comment, i)=> {         
                return (
                    <Comment getCmtAll={this.getCmtAll} getRe={this.props.getRe} uidPage={this.props.match} uidPost={this.props.post} key={i} index={i} comment={comment} />
                );
            });
        }
        let xhtmlShowmore = <div className="show-more"><a href={null} onClick={this.showMore}>show more</a></div> ;
        if(comments.length <= numberOfitemsShown){
            xhtmlShowmore = null
        } 
        let likeCount = 0
        if(likes.length > 0){
            likeCount = likes.length       
        }
        let xhtmlButtonLike = <a href={null} onClick={this.HandleLike} className="btn text-green"><i className="icon ion-thumbsup" /> Like </a>;
        if(setLike === false){
            xhtmlButtonLike = <a href={null} onClick={this.HandleUnLike} className="btn text-yellow"><i className="icon ion-thumbsdown" /> Unlike </a>
        } 
        let xhtmlDelete = null; let xhtmledit = null; let xhtmlReport = null
        if(this.props.myuser.uid === this.props.match.params.uid){
            xhtmlDelete = <a className="btn text-red" data-toggle="modal" data-dismiss="modal" href={`#modal-${item.id}`}>
                                    <i className="fa fa-trash"/> delete
                            </a>                                              
            xhtmledit = <a href={null} data-toggle="modal" data-target={`#update-${item.id}`} className="btn text-green"><i className="icon ion-more"/> edit</a>
        } else {
            xhtmlReport = <a className="btn text-yellow" data-toggle="modal" data-dismiss="modal" href={`#reportPost`}>
                            <i className="fa fa-exclamation" aria-hidden="true"/> Report
                        </a>
        }
        let xFormButton = null
        if(showForm === true){
            xFormButton = <div className="comment-form">
                            {xhtmlComment}
                            {xhtmlShowmore}           
                            <div className="post-comment">
                                <img src={`/images/users/${this.props.myuser.avatar}`} alt="" className="profile-photo-sm" />
                                <input value={this.state.texts} onChange={this.onChange} onKeyDown={this.handleKeyDown} name="texts" type="text" className="form-control" placeholder="Post a comment" />
                            </div>
                        </div>
        }

        let xImage = `/posts/images/${item.image}`
        if(item.image === null){
            xImage =  `/images/users/${user.avatar}`
        } 
        return (         
            <div className="post-container">
                <img src={`/images/users/${user.avatar}`} alt="user" className="profile-photo-md pull-left" />
                <div className="post-detail">
                    <div className="user-info">
                        <h5><Link to={`/my.profile/${user.uid}`} className="profile-link">{user.first_name} {user.last_name}</Link> <span className="following">following</span></h5>
                        <p className="text-muted">{item.created}</p>
                    </div>
                    <div className="reaction">
                        {xhtmlReport}
                        <ModalPostReport post={item} user={user}/>
                        {xhtmledit}
                        <ModalUpdatePost getRe={this.props.getRe} post={item} user={user}/>
                        {xhtmlDelete}
                        <ModalDelete HandleDelete={this.HandleDelete} post={item} /> 
                    </div>
                    <div className="line-divider" />
                    <div className="img-audio-post">
                        <div className="img-post" data-toggle="modal" href={`#Post-${item.id}`}>
                            <img className="Song-Thumbnail" src={xImage} alt="tet" />
                        </div>
                        <h2 className="Song-Title"><Link to={`/track/${item.id}`}>{item.title}</Link></h2>
                        <p className="Singer">{item.post}</p>
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
                            src={`/posts/audio/${item.audio}`}
                            onLoadedData={this.handleLoadedData}
                            onTimeUpdate={() => this.setState({currentTime: this.audioRef.current.currentTime})}
                            onEnded={() => this.setState({isPlay: false})}
                        />
                        <div className="Control-Button-Group">
                            <div className="Prev-Button" onClick={this.handlePre}>
                                <PrevIcon />
                            </div>
                            <div className="Pause-Play-Button" onClick={this.handlePausePlayClick}>
                                {isPlay ? <PauseIcon /> : <PlayIcon />}
                            </div>
                            <div className="Next-Button" onClick={this.handleStop}>
                                <i className="fa fa-stop-circle-o" style={{fontSize: '27px'}}/>
                            </div>
                        </div>
                    </div>
                    <div className="line-divider" />
                    <div className="react-like">
                        <b data-toggle="modal" href={`#likes-${item.id}`} className="b text-green">
                            <i className="icon ion-thumbsup" /> {likeCount}
                        </b>
                        <ModalLikes likes={likes} post={item} />
                        <b className="b text-green"><i className="icon ion-play" /> {item.view }</b>
                    </div>
                    <div className="line-divider" />
                    <div className="button-like">
                        <div className="button-react">
                            {xhtmlButtonLike}
                            <a href={null} className="btn text-blue" onClick={this.handleShowForm} ><i className="fa fa-commenting" /> Comment </a>
                            <a className="btn text-green" data-toggle="modal" data-dismiss="modal" href={`#modalAdd-${item.id}`}>
                                <i className="fa fa-list"/> Add to playlist
                            </a>                                         
                            <ModalAddPlaylist post={item} />
                        </div>
                    </div>                         
                    <div className="line-divider" />                                             
                    {xFormButton}
                </div>
            </div>               
        );
    }
}

const mapStateToProps = state => {
    return {
        myuser: state.user,
        posts: state.posts
    }
}

export default withRouter(connect(mapStateToProps,null)(PostContentDetail));