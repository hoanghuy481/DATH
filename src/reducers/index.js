import { combineReducers } from 'redux';
//import notify from './notify';
import user from './user';
import isLogin from './isLogin';
import playlists from './playlists';
import query from './query';

const appReducers = combineReducers({
    query,
    //notify,
    user,
    isLogin,
    playlists
});

export default appReducers;