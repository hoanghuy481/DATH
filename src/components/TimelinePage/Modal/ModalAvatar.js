import React , { Component } from 'react';
import {connect} from 'react-redux';
import {FormGroup, Label, Input,Form} from 'reactstrap';
import { Link } from 'react-router-dom';

import { uploadAvatar, getUser } from '../../api/UserFuncions';
import {actLogin} from '../../../actions/index';

class ModalAvatar extends Component {
    constructor() {
        super()
        this.state = {
            selectedFile: null,
            errors: {}
        }
    }
    getUser = () =>{     
        getUser(this.props.user.id).then(data => {
            this.props.users(data)      
        })	
    }
    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }
    uploadHandler = (id, uid) => {
        if (!this.state.selectedFile) {
            alert('Bạn chưa chọn file.')
            return;
        }
        const formData = new FormData();
        formData.append('image', this.state.selectedFile);
        uploadAvatar(id,formData).then(res => {
            this.props.getRe(id);
            this.props.getU(uid);
            this.getUser();
            this.setState({
                electedFile: null
            })
        })   
    }

    
    render(){      
        let user = {id: '', first_name: '', last_name: '', email: '', password: '', created: '', avatar: ''};
        user = (this.props.user !== undefined) ? this.props.user : user;        
        let xhtmUpload = null
        if(this.props.myuser.uid === user.uid){
            xhtmUpload = <div className="upload-image">
                            <div className="post-text">
                                        <Form encType="multipart/form-data">
                                            <FormGroup>
                                                <Label for="avatar">Chọn Avatar</Label>
                                                <Input onChange={this.fileChangedHandler} type="file" name="avatar" id="avatar" placeholder="chọn file"/>
                                            </FormGroup>
                                            <button type="button" className="btn text-blue" onClick={() => {this.uploadHandler(user.id, user.uid)}}>Upload</button>
                                        </Form> 
                                    </div>
                            <div className="line-divider" />
                        </div>
        }

        return (
            <div className="post-content">
                <div className="modal fade" id="imageProfile" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            {/*  */}
                            <div className="post-container">
                                <img src={`/images/users/${user.avatar}`} alt="user" className="profile-photo-md pull-left" />
                                <div className="post-detail">
                                    <div className="user-info">
                                        <h5><Link to={`/my.profile/${user.uid}`} className="profile-link">{user.first_name} {user.last_name}</Link> <span className="following">following</span></h5>
                                    </div>                                       
                                    <div className="line-divider" />
                                    {xhtmUpload}
                                    <img src={`/images/users/${user.avatar}`} alt={`${user.avatar}`}  className="image-avatar" style={{width: '70%', height: '70%'}} />                                        
                                </div>
                            </div>      
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        myuser: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		users: (user) => {
            dispatch(actLogin(user));
		}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalAvatar)