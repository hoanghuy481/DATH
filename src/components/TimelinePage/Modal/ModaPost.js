import React , { Component } from 'react';
import {connect} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import PostContentDetail from './../PostContentDetail'

class ModalContent extends Component {
    constructor() {
        super()
        this.state = {
            postes: [],
            errors: {}
        }
    }

    render(){
        let item ={ id: '', post: '', pictures: '', videos:'', like:'', id_user:'', created:'' }
        item = this.props.post !== null ? this.props.post : item;
        let user = this.props.user;
        return (         
            <div id={`Post-${item.id}`} className="modal" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/*  */}
                        <PostContentDetail post={item} user={user}/>
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

export default connect(mapStateToProps,null)(ModalContent);