import React , { Component } from 'react';
import {connect} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ModalDelete extends Component {
    constructor() {
        super()
        this.state = {
            postes: [],
            errors: {}
        }
    }

    render(){
        let item ={id: '',title: '',users_id: '',created:'' }
        item = this.props.playlist !== null ? this.props.playlist : item;
        let user = this.props.user;
     
        return (         
            <div id={`modal-${item.id}`} className="modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Playlist</h5>
                            <a type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </a>
                        </div>
                        <div className="modal-body">
                            You can edit it if you just need to change something.
                        </div>
                        <div className="modal-footer">
                            <a onClick={()=> this.props.HandleDelete(user.id, item.id)} className="btn text-red" data-dismiss="modal">
                                <i className="fa fa-trash"/> delete
                            </a>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,null)(ModalDelete);