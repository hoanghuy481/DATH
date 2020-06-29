import React , { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

class Popup extends Component {
    constructor() {
        super()
        this.state = {
            postes: [],
            errors: {}
        }
    }
   
    render(){
        return (
            <div class="media">
            	<div class="row js-masonry" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": ".grid-sizer", "percentPosition": true }'>
                    <div className="grid-item col-md-8 col-sm-8">
                        <div className="media-grid">
                            <div className="img-wrapper" data-toggle="modal" data-target=".modal-1">
                                <img src="images/post-images/6.jpg" alt="" className="img-responsive post-image" />
                            </div>                  
                            {/*Popup*/}
                            <div className="modal fade modal-1" tabIndex={-1} role="dialog" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="post-content">
                                            <img src="images/post-images/1.jpg" alt="post-image" className="img-responsive post-image" />
                                            <div className="post-container">
                                                <img src="images/users/user-5.jpg" alt="user" className="profile-photo-md pull-left" />
                                                <div className="post-detail">
                                                    <div className="user-info">
                                                        <h5><a href="timeline.html" className="profile-link">Alexis Clark</a> <span className="following">following</span></h5>
                                                        <p className="text-muted">Published a photo about 3 mins ago</p>
                                                    </div>
                                                    <div className="reaction">
                                                        <a className="btn text-green"><i className="icon ion-thumbsup" /> 13</a>
                                                        <a className="btn text-red"><i className="fa fa-thumbs-down" /> 0</a>
                                                    </div>
                                                    <div className="line-divider" />
                                                    <div className="post-text">
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <i className="em em-anguished" /> <i className="em em-anguished" /> <i className="em em-anguished" /></p>
                                                    </div>
                                                    <div className="line-divider" />
                                                    <div className="post-comment">
                                                        <img src="images/users/user-11.jpg" alt="" className="profile-photo-sm" />
                                                        <p><a href="timeline.html" className="profile-link">Diana </a><i className="em em-laughing" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Popup End*/}
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

export default connect(mapStateToProps, null) (Popup)