import * as types from './../constants/ActionType';

let defaultState = {
	id:'', email: '', first_name: '', last_name: '', created: '', avatar:''	, uid:'', following:'',
};

const user = (state = defaultState, action) => {

	switch(action.type){

		case types.USER_LOGIN:
			state = action.userInfo;			
			return {...state};

		case types.USER_LOGOUT:
			state.info = {id:'', email: '', first_name: '', last_name: '', created: '', avatar:'', uid:''};
			return {...state};
		default:
			return state;
	}
}

export default user;



