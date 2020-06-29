import React , { Component } from 'react';
import { orderBy } from 'lodash';

import { get10Post ,get10LikePost } from '../../components/api/PostFuncions';
import BxhTop10 from './BxhTop10';
import BxhTop10Like from './BxhTop10Like';

import { Link } from 'react-router-dom';

class SidebarRight extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {
            posts: [],
            likes:[],
            errors: {},
        }
    }
    componentDidMount(){
        this._isMounted = true;
        this.getAll()
    }
  
    componentDidUpdate(prevProps){
        if(prevProps.user.id !== this.props.user.id)
        {
            this.getAll()
        }
    }
 
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    getAll = () => {       
        if(this._isMounted){
            get10Post().then(data => {
                this.setState(
                    {
                        posts: data.data
                    }
                )
            })
            get10LikePost().then(data => {
                this.setState(
                    {
                        likes: data.data
                    }
                )
            }) 
        }
    } 

    render(){

        let {posts, likes} = this.state;
        
        
        let xhtml = null;
        if(posts.length > 0){ 
            xhtml = posts = orderBy(posts, ['view'],['desc'])
            .slice(0, 10)
            .map((post, i)=> {         
                return (
                    <BxhTop10 key={i} index={i} post={post}/>	
                );
            }); 
        }

        let xlike = null;
        if(likes.length > 0){ 
            xlike = likes = orderBy(likes, ['likes'],['desc'])
            .slice(0, 10)
            .map((like, i)=> {         
                return (
                    <BxhTop10Like key={i} index={i} post={like}/>	
                );
            }); 
        }
        return (
            <div className="col-md-2 static">
                <div className="suggestions" >
                    <Link to={`../playlist-top10/43`}><h4 className="grey">BHX TOP 10 LƯỢT NGHE <i className="fa fa-play-circle-o" aria-hidden="true"></i></h4></Link>
                    {xhtml}
                </div>
                <div className="suggestions" >
                    <Link to={`../playlist-top10/43`}><h4 className="grey">BHX TOP 10 LƯỢT Thích <i className="fa fa-play-circle-o" aria-hidden="true"></i></h4></Link>
                    {xlike}
                </div>
            </div>          
        );
    }
}

export default SidebarRight;