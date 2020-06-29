import React , { Component } from 'react';
import {connect} from 'react-redux';
import { orderBy } from 'lodash';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import ModalButtonAddPlaylist from './ModalButtonAddPlaylist'

class ModalAddPlaylist extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            track:[],
            setAdd: true,
            errors: {}
        }
    }
  

    render(){
        let item ={ id: '', post: '', pictures: '', videos:'', like:'', id_user:'', reated:'' }
   
        item = this.props.post !== null ? this.props.post : item;
        let user = this.props.user;
        
        let {playlists} = this.props ;    
        let xhtml = null
        if(playlists.length > 0){ 
            xhtml = playlists = orderBy(playlists, ['id'],['desc'])
            .map((playlist, i)=> {         
                return (
                    <ModalButtonAddPlaylist post={item} playlist={playlist} key={i} />
                );
            }); 
        }
        return (         
            <div id={`modalAdd-${item.id}`} className="modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <a type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </a>
                            <h3 className="modal-title" id="exampleModalLabel">Add to playlist</h3>
                        </div>
                        <div className="line-divider" />
                        <div className="modal-body">
                            {xhtml}
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        playlists: state.playlists
    }
} 

export default connect(mapStateToProps,null)(ModalAddPlaylist);

                                     