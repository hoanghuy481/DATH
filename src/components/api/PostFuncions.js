import axios from 'axios'

export const getPost = async (id) => {
    return await axios
        .get(`/posts/posted/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}
export const getOnePost = async (id) => {
    return await axios
        .get(`/posts/post/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}
export const createPost = (uid,title,post,image,formData) => {
    return axios
		.post(`posts/created/${uid}/${title}/${post}/${image}`, formData)
		.catch(err => {
			console.log(err)
		})
}
export const updateView = (id,view) => {
    return axios
		.put(`posts/view/${id}`,{
			view : view+1
		})
		.catch(err => {
			console.log(err)
		})
}
export const updateImage = (id,formData) => {
    return axios
		.put(`posts/update_image/${id}`, formData)
		.catch(err => {
			console.log(err)
		})
}
export const updatePost = (id,title,post) => {
    return axios
		.put(`posts/update/${id}/${title}/${post}`)
		.catch(err => {
			console.log(err)
		})
}
export const deletePost = (uid,id) => {
    return axios
		.delete(`/posts/delete/${uid}/${id}`, {
			headers: { 'Content-Type': 'application/json' }
		})
		.then(function(response) {
			console.log(response)
		})
		.catch(function(error) {
			console.log(error)
		})
}

export const searchPost = (search) => {
	return axios
	  .get(`/posts/search/${search}`,{
		 
	  }) 
	  .then(res => {
        return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
// get post user following
export const getPostByFollowing = (id) => {
	return axios
	  .get(`/posts/post_by_following/${id}`,{
	  }) 
	  .then(res => {
        return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
//Get User's Post
export const getUserPost = (id) => {
    return axios
        .get(`/posts/user/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const get10Post = () => {
    return axios
        .get(`/posts/bxh10/`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const get10LikePost = () => {
    return axios
        .get(`/posts/bxhlike10/`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}