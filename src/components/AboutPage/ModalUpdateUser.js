import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormGroup, Label, Input,Form} from 'reactstrap';

import { uploadAvatar, updateUser } from '../api/UserFuncions';

class ModalUpdateUser extends Component {
    constructor() {
        super()
        this.state = {
            selectedFile: null,
            first_name: '',
            last_name:'',
            bio:''
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id){
            this.setState({
                first_name: this.props.user.first_name,
                last_name: this.props.user.last_name,
                bio: this.props.user.last_name,
            })
        }
        
    }
    handleChange=(event)=>{
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });

    }
    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.files[0] })
    }
    uploadHandler = (id) => {
        if (!this.state.selectedFile) {
            alert('Bạn chưa chọn file.')
            return;
        }
        const formData = new FormData();
        formData.append('image', this.state.selectedFile);
        uploadAvatar(id,formData).then(res=>{
            this.props.getRe(this.props.user.uid)
        })
    }
    handleSubmit = (id) =>{
        let {first_name, last_name, bio} = this.state
        updateUser(id,first_name,last_name,bio).then(res=>{
            this.props.getRe(this.props.user.uid)
        })
        
    }
    render(){
        let {user} = this.props;
        return (         
                <div id={`updateuser-${user.id}`} className="modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="post-container">
                                <img src={`/images/users/${user.avatar}`} alt="user" className="profile-photo-md pull-left" />
                                <div className="post-detail">
                                    <div className="user-info">
                                        <h5><Link to={`/my.profile/${user.uid}`} className="profile-link">{user.first_name} {user.last_name}</Link></h5>
                                    </div>
                                </div>
                                <div className="post-container">
                                    <div className="line-divider" />
                                    <div className="upload-image">
                                        <div className="image-post" style={{width: '45%', display: 'inline-block'}}>
                                            <img src={`/images/users/${user.avatar}`} alt={`${user.id}`} className="image" style={{width: '100%'}}/>
                                        </div>
                                        <div className="post-text" style={{width: '45%', display: 'inline-block'}}>
                                            <Form encType="multipart/form-data">
                                                <FormGroup>
                                                    <Label for="first_name">First Name</Label>
                                                    <Input onChange={this.handleChange} type="text" name="first_name" value={this.state.first_name}/>
                                                    <Label for="last_name">Last Name</Label>
                                                    <Input onChange={this.handleChange} type="text" name="last_name" value={this.state.last_name}/>
                                                    <Label for="bio">Bio</Label>
                                                    <Input onChange={this.handleChange} type="textarea" name="bio" value={this.state.bio} placeholder="Tell the world a litle bit about yourself"/>
                                                    <Label for="image">Chọn Ảnh Avatar</Label>
                                                    <Input onChange={this.fileChangedHandler} type="file" name="image" placeholder="chọn file"/>
                                                    <button type="button" className="btn text-blue" onClick={() => {this.uploadHandler(user.id,user.image)}}>Upload</button>
                                                </FormGroup>
                                            </Form> 
                                            <button className="btn btn-primary" data-dismiss="modal" onClick={() => {this.handleSubmit(user.id)}} style={{float: 'right'}} >Submit</button>
                                        </div>
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
        myuser: state.user,
        posts: state.posts
    }
}

export default connect(mapStateToProps,null)(ModalUpdateUser);