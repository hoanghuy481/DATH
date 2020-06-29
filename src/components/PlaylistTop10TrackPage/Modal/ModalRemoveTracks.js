import React , { Component } from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ModalRemoveTracks extends Component {
    constructor() {
        super()
        this.state = {
            errors: {}
        }
    }

    render(){
        let item = { audio:'', first_name:'', id:'', image:'', last_name:'', post:'', title:'', uid:'', view:''}
        item = this.props.item !== null ? this.props.item : item;
        return (         
            <div id={`modalDel-${item.id}`} className="modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Remove Track</h5>
                            <a type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </a>
                        </div>
                        <div className="modal-body">
                            You can edit it if you just need to change something.
                        </div>
                        <div className="modal-footer">
                            <a onClick={()=> this.props.handleRemoveTrack()} className="btn text-red" data-dismiss="modal">
                                <i className="fa fa-trash"/> Remove
                            </a>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}


export default (ModalRemoveTracks);