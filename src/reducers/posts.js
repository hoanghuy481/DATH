import * as types from './../constants/ActionType';

let defaultState = [];

const posts = (state = defaultState, action) => {

	switch(action.type){

		case types.GET_POST:
			state = action.allPost;			
			return {...state};

		default:
			return state;
	}
}

export default posts;



