import * as types from '../constants/ActionType';

let defaultState = [];

const playlists = (state = defaultState, action) => {

	switch(action.type){

		case types.GET_PLAYLISTS:
			state = action.playlists;			
			return [...state];

		default:
			return state;
	}
}

export default playlists;



