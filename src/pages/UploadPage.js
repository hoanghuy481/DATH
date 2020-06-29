import React , { Component } from 'react';
import {connect} from 'react-redux';

import SidebarLeft from '../components/HomePage/SidebarLeft';
import Activity from '../components/TimelinePage/Activity';
import CreateBox from '../components/TimelinePage/CreateBox';

class UploadPage extends Component {
    render(){
        return (
            <div className="row">
                <SidebarLeft user={this.props.user} />  
                        <div className="col-md-3" />
                        <div className="col-md-7">
                            <CreateBox user={this.props.user} />
                        </div>
                        <Activity user={this.props.user}/>
                </div>
          );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,null) (UploadPage);
