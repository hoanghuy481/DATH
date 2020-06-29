import React , { Component } from 'react';
import {connect} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class ModalDeleteComment extends Component {
    constructor() {
        super()
        this.state = {
            postes: [],
            errors: {}
        }
    }

    render(){
        let item ={
            id: '',
            comment: '',
            created: '',
            first_Name:'',
            last_Name:'',
            uid:'',
        }

        item = this.props.comment !== null ? this.props.comment : item;
        let {uid} = this.props;
        

        return (         
            <div id={`modal-${item.id}`} className="modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete comment</h5>
                            <a type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </a>
                        </div>
                        <div className="modal-body">
                            You can edit it if you just need to change something.
                        </div>
                        <div className="modal-footer">
                            <a className="btn text-yellow" >
                                <i className="icon ion-more"/> edit
                            </a>
                            <a onClick={()=> this.props.HandleDelete(uid, item.id)} className="btn text-red" data-dismiss="modal">
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

export default connect(mapStateToProps,null)(ModalDeleteComment);

                                     