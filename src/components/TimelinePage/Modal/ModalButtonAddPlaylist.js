import React , { Component } from 'react';
import {connect} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getTracklist,createTracklist, deleteTracklist } from '../../api/TrackList';

class ModalButtonAddPlaylist extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = { 
            trackLists: [],
            errors: {}, 
            setAdd: true 
        }
    }
    componentDidMount(){
        this._isMounted = true;
        this.getTrack(this.props.playlist.id)
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.playlist.id !== this.props.playlist.id)
        {
            this.getTrack(this.props.playlist.id)
        }   
        if(prevState.trackLists !== this.state.trackLists){
            if(this.state.trackLists.findIndex(x=>x.post_id === this.props.post.id) === -1){
                this.setState({
                    setAdd: true
                })
            }else{
                this.setState({
                    setAdd: false
                })
            }
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
        this.setState = (state,callback)=>{
            return;
        };
    }
    getTrack = async (id) =>{
        if(this._isMounted){
            await getTracklist(id).then(res =>{
                this.setState({trackLists: [...res.data]})
            })
        }
    }
    handleAddTrack = () =>{
        const Add = {
            posts_id: this.props.post.id,
            playlists_id: this.props.playlist.id
        }
        createTracklist(Add).then(res=>{
            this.setState({setAdd: false})            
        })
    }
    handleDeleteTrack = () =>{
        deleteTracklist(this.props.playlist.id,this.props.post.id, ).then(res=>{
            console.log(res);
            this.setState({setAdd: true})            
        })
    }

    render(){
        let item ={ id: '', post: '', pictures: '', videos:'', like:'', id_user:'', reated:'' }
        item = this.props.post !== null ? this.props.post : item;
        let {playlist} = this.props;
        let {setAdd} = this.state
        let xhtmlButtonAdd = <button onClick={this.handleAddTrack} className="btn btn-primary" style={{width: '30%'}}>Add to playlist</button>
        if(setAdd === false){
            xhtmlButtonAdd = <button onClick={this.handleDeleteTrack} className="btn btn-outline-warning" style={{width: '30%'}}>Added</button>
        } 
        
        return (         
            <div className="button-add">
                <label  style={{width: '70%'}}><p>{playlist.title}</p></label>
                {xhtmlButtonAdd}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,null)(ModalButtonAddPlaylist);

                                     