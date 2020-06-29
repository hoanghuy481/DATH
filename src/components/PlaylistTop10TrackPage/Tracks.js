import React , { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import { deleteTracklist } from '../../components/api/TrackList';
import ModalRemoveTracks from './Modal/ModalRemoveTracks'

class Tracks extends Component {
    constructor() {
        super()
        this.state = {
            active : false,
            errors: {}
        }
    }
    toggleMenuSwitch = () => {
        this.setState({
            active: !this.state.active
        })
    }
    handleRemoveTrack = () =>{
        deleteTracklist(this.props.playlist.id,this.props.track.post_id).then(res=>{
            console.log(res);
            this.props.getTracklist(this.props.playlist.id)
            this.setState({setAdd: true})            
        })
    }
    render(){
        let item = { audio:'', first_name:'', id:'', image:'', last_name:'', post:'', title:'', uid:'', view:''}
        item = this.props.track !== null ? this.props.track : item;
        let index = this.props.index + 1;
        let style =  null
        if (this.props.index === this.props.audioIndex) {
            style = {backgroundColor: 'lightgray'}
        }
        let xRemove = null
        if(this.props.user.uid === this.props.myuser.uid){
            xRemove =   <a className="btn text-red" data-toggle="modal" href={`#modalDel-${item.id}`}>
                            <i className="fa fa-trash"/>
                        </a>
        }
        let xImage = `/posts/images/${item.image}`
        if(item.image === null){
            xImage =  `/images/users/${item.avatar}`
        } 
        return (         
            <div className="active-audio"  style={{ position: 'relative' }} style={style}>
                <div className="remove-track" style={{position: 'absolute', left: '430px'}}>
                    {xRemove}
                    <ModalRemoveTracks handleRemoveTrack={this.handleRemoveTrack} item={item}/>
                </div>
                <div className="item-audio" onClick={this.toggleMenuSwitch}>
                    <li onClick={()=> this.props.handleClickPlay(this.props.index)} className="post-track active" >
                        <img src={xImage} alt="" className="track-photo-sm" />
                        <div className="title-track">
                            <span className="number-playlist">{index}</span>
                            <Link to={`/profile/${item.uid}`}>{item.first_name} {item.last_name}</Link>
                            <span className="space-playlist">-</span>
                            <Link to={`/track/${item.post_id}`}>{item.title}</Link>
                        </div>
                    </li>
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

export default connect(mapStateToProps, null)(Tracks);
