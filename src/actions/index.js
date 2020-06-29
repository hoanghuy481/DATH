import * as types from './../constants/ActionType';

export const actIsLogin = () => {
	return {
		type : types.USER_ISLOGIN,
	}
}

export const actLogin = (userInfo) => {
	return {
		type : types.USER_LOGIN,
		userInfo
	}
}

export const actLogout = () => {
	return {
		type : types.USER_LOGOUT
	}
}
export const actChangeNotify = (style, title, content) => {
	return {
		type : types.CHANGE_NOTIFY,
		style, title, content
	}
}

export const actHideNotify = () => {
	return {
		type : types.HIDE_NOTIFY,
	}
}

export const actGetPost = (allPost) => {
	return {
		type : types.GET_POST,
		allPost
	}
}

export const actGetPlaylist = (playlists) => {
	return {
		type : types.GET_PLAYLISTS,
		playlists
	}
}

export const actSearch = (query) => {
	return {
		type : types.SEARCH_ARTIST,
		query
	}
}