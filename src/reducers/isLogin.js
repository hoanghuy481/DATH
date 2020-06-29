import * as types from './../constants/ActionType';

let defaultState = {
	isLogin: false,
};

const user = (state = defaultState, action) => {

	switch(action.type){

		case types.USER_ISLOGIN:
			state.isLogin = true;
			return {...state};

		case types.USER_LOGOUT:
			state.isLogin = false;
			return {...state};
		default:
			return state;
	}
}

export default user;



