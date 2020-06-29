import React , { Component } from 'react';
import {connect} from 'react-redux';
import { getPostTypeRp } from '../../api/TypeReport';
import { PostReport } from '../../api/Report';

class ModalPostReport extends Component {
    constructor() {
        super()
        this.state = {
            typeReports: [],
            description:'',
            type: '1',
            errors: {}
        }
    }
    handleChange = (event) => {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });

    }
    componentDidMount(){
        this.postTypeReport();
    }
    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
    }
    postTypeReport = () =>{
        getPostTypeRp().then(data =>{
            this.setState({typeReports: [...data]})
        })
    }
    handleSubmit = (event) =>{
        let item = {
            description: this.state.description,
            type_id: this.state.type,
            posts_id: this.props.post.id,
            users_id:  this.props.myuser.id
        };
        PostReport(item).then(res => {
            alert(res);
            this.setState({
                description: '',
                type:'1'
            })
        })        
        event.preventDefault();
    }
    
    render(){      
        let {typeReports, description, type} = this.state;
        let xSelect = null;
        if(typeReports.length > 0){
            xSelect = typeReports 
            .map((typeReport, i)=> {         
                return (
                    <option key={i} value={typeReport.id}>{typeReport.type}</option>
                );
            });
        }
        
        return (
            <div className="modal fade" id="reportPost" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Please select a problem to continue</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>You can report this after selecting a problem. Please note we have fewer reviewers available right now.</label>
                                <select className="form-control" name="type" value={type} onChange={this.handleChange} >
                                    {xSelect}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleFormControlTextarea1">Description</label>
                                <textarea className="form-control" rows="3" name="description" type="text" value={description} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.handleSubmit} data-dismiss="modal" className="btn btn-primary">Save changes</button>
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

export default connect(mapStateToProps)(ModalPostReport)