import React , { Component } from 'react';
import {connect} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {withRouter, Link} from 'react-router-dom';
import "react-jinke-music-player/assets/index.css";
import TimeSlider from "react-input-slider";


import ModalDelete from '../PostDetailPage/Modal/ModalDelete';
import ModalPostReport  from '../PostDetailPage/Modal/ModalPostReport';
import ModalUpdatePost  from '../PostDetailPage/Modal/ModalUpdatePost';
import ModalAddPlaylist from '../TimelinePage/Modal/ModalAddPlaylist'
import ModalLikes  from '../TimelinePage/Modal/ModalLikes';

import Comment from '../PostDetailPage/Comment';

import { getComment,createComment } from '../api/CommentFuntion';
import { deletePost,updateView } from '../api/PostFuncions';
import { createLike, unLike, getLike } from '../api/LikeFuntion';
import {PrevIcon,PauseIcon,PlayIcon} from "./../../icons";
import  { postsRef } from '../../firebase';

class Index extends Component {
    constructor() {
        super()
        this.audioRef = React.createRef();
        this.state = {
            comments: [],
            texts: '',
            numberOfpostsShown: 3,
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
                let noti = {
                    posts_id: this.props.post.id,
                    users_id: this.props.myuser.uid,
                    myuser: this.props.post.uid,
                    users_name: this.props.myuser.last_name +' '+ this.props.myuser.first_name,
                    title: this.props.post.title,
                    created: res.created,
                    comments_id: res.comments_id,
                    type: 'comment',
                    seen: false
                }
                this.getCmtAll(newComment.posts_id);
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
            this.props.getRe(this.props.myuser.id)
        })      
    };
    componentDidMount(){
        this._isMounted = true;
        if(this.props.post.id_user !== undefined){
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
        if (this.state.numberOfpostsShown + 3 <= this.state.comments.length) {
            this.setState(state => ({ numberOfpostsShown: state.numberOfpostsShown + 3 }));
        } else {
            this.setState({ numberOfpostsShown: this.state.comments.length })
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
               // this.props.getRe(this.props.myuser.id)
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
        let {comments, numberOfpostsShown, likes, setLike, isPlay, duration, currentTime, showForm} = this.state;  
        let post ={ id: '', post: '', image: '',videos:'',like:'',id_user:'',created:'',title:'',audio:'',view:''}
        post = this.props.post !== undefined ? this.props.post : post;
        let xhtmlComment = null; 
        if(comments.length > 0){
            xhtmlComment = comments
            .sort((a,b) => a.id - b.id)
            .slice(0, numberOfpostsShown)
            .map((comment, i)=> {         
                return (
                    <Comment getCmtAll={this.getCmtAll} uidPage={this.props.match} uidPost={this.props.post} key={i} index={i} comment={comment} />
                );
            });
        }
        let xhtmlShowmore = <div className="show-more"><a href={null} onClick={this.showMore}>show more</a></div> ;
        if(comments.length <= numberOfpostsShown){
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
        if(this.props.myuser.uid === post.uid){
            xhtmlDelete = <a className="btn text-red" data-toggle="modal" data-dismiss="modal" href={`#modal-${post.id}`}>
                                    <i className="fa fa-trash"/> delete
                            </a>                                              
            xhtmledit = <a href={null} data-toggle="modal" data-target={`#update-${post.id}`} className="btn text-green"><i className="icon ion-more"/> edit</a>
        } else {
            xhtmlReport = <a className="btn text-yellow" data-toggle="modal" data-dismiss="modal" href={`#reportPost`}>
                            <i className="fa fa-exclamation" aria-hidden="true"/> Report
                        </a>
        }
        let xImage = null
        if(post.image == null ){
            xImage = <img className="Song-Thumbnail" src={`/images/users/${post.avatar}`} alt="tet" />
        } else{
            xImage = <img className="Song-Thumbnail" src={`/posts/images/${post.image}`} alt="tet" />
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
        return (         
            <div className="post-content">
                <div className="post-container">
                    <img src={`/images/users/${post.avatar}`} alt="user" className="profile-photo-md pull-left" />
                    <div className="post-detail">
                        <div className="user-info">
                            <h5><Link to={`/my.profile/${post.uid}`} className="profile-link">{post.first_name} {post.last_name}</Link> <span className="following">following</span></h5>
                            <p className="text-muted">{post.created}</p>
                        </div>
                        <div className="reaction">
                            {xhtmlReport}
                            <ModalPostReport post={post} user={post}/>
                            {xhtmledit}
                            <ModalUpdatePost getRe={this.props.getRe} post={post} user={post}/>
                            {xhtmlDelete}
                            <ModalDelete HandleDelete={this.HandleDelete} post={post} />
                        </div>
                        <div className="line-divider" />
                        <div className="img-audio-post">
                            <div className="img-post" data-toggle="modal" href={`#Post-${post.id}`}>
                                {xImage}
                            </div>
                            <Link to={`/track/${post.id}`}><h2 className="Song-Title">{post.title}</h2></Link>
                            <p className="Singer">{post.post}</p>
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
                                src={`/posts/audio/${post.audio}`}
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
                            <b data-toggle="modal" href={`#likes-${post.id}`} className="b text-green">
                                <i className="icon ion-thumbsup" /> {likeCount}
                            </b>
                            <ModalLikes likes={likes} post={post} />
                            <b className="b text-green"><i className="icon ion-play" /> {post.view }</b>
                        </div>
                        <div className="line-divider" />
                        <div className="button-like">
                            <div className="button-react">
                                {xhtmlButtonLike}
                                <a href={null} className="btn text-blue" onClick={this.handleShowForm} ><i className="fa fa-commenting" /> Comment </a>
                                <a className="btn text-green" data-toggle="modal" data-dismiss="modal" href={`#modalAdd-${post.id}`}>
                                    <i className="fa fa-list"/> Add to playlist
                                </a>   
                                <ModalAddPlaylist post={post} />
                            </div>
                            
                        </div>                         
                        <div className="line-divider" />   
                        {xFormButton}                                          
                    </div>
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

export default withRouter(connect(mapStateToProps,null)(Index));