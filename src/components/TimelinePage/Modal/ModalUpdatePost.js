import React , { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormGroup, Label, Input,Form} from 'reactstrap';

import { updatePost,updateImage } from '../../api/PostFuncions';

class ModalUpdatePost extends Component {
    constructor() {
        super()
        this.state = {
            selectedFile: null,
            direction: '',
            title:''
        }
    }
    componentDidMount(){
        this.setState({
            direction: this.props.post.post,
            title: this.props.post.title
        })
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
        updateImage(id,formData).then(res=>{
            this.props.getRe(this.props.user.id)
        })
    }
    handleSubmit = (id) =>{
        let {title, direction} = this.state
        updatePost(id,title,direction).then(res=>{
            this.props.getRe(this.props.user.id)
        })
        
    }
    render(){
        let item ={ id: '', post: '', pictures: '', videos:'', like:'', id_user:'', created:'' }
        item = this.props.post !== null ? this.props.post : item;
        let user = this.props.user;
        let xhtmUpload = null;
        let xImage = `/posts/images/${item.image}`
        if(item.image === null){
            xImage =  `/images/users/${user.avatar}`
        } 
        if(this.props.myuser.uid === user.uid){
            xhtmUpload = 
            <div className="upload-image">
                <div className="image-post" style={{width: '48%', display: 'inline-block'}}>
                    <img src={xImage} alt={`${item.id}`} className="image" style={{width: '100%'}}/>
                </div>
                <div className="post-text" style={{width: '48%', display: 'inline-block'}}>
                    <Form encType="multipart/form-data">
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input onChange={this.handleChange} type="text" name="title"  value={this.state.title}/>
                            <Label for="direction">Directions</Label>
                            <Input onChange={this.handleChange} type="textarea" name="direction" value={this.state.direction} placeholder="chọn file"/>
                            <Label for="image">Chọn Ảnh bìa</Label>
                            <Input onChange={this.fileChangedHandler} type="file" name="image" placeholder="chọn file"/>
                            <button type="button" className="btn text-blue" onClick={() => {this.uploadHandler(item.id,item.image)}}>Upload</button>
                        </FormGroup>
                    </Form> 
                </div>
                <div className="line-divider" />
                <button className="btn btn-primary" data-dismiss="modal" onClick={() => {this.handleSubmit(item.id)}} style={{float: 'right'}} >Submit</button>
            </div>
        }
        return (         
                <div id={`update-${item.id}`} className="modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    {xhtmUpload}
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

export default connect(mapStateToProps,null)(ModalUpdatePost);