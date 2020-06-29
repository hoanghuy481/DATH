import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password,
      uid: newUser.uid
    })
    .then(response => {
      console.log(response)
    })
}
export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if(response.data.token !== undefined){
        localStorage.setItem('usertoken', response.data.token)
      }
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err
    })
}
export const getAnotherUser = (uid) => {
  return axios
      .get(`/users/anotherprofile/${uid}`, {
      })
      .then(res => {
          return res.data
      })
      .catch(err => {
        console.log(err)
      })
}
export const getUser = (id) => {
  return axios
      .get(`/users/profile/${id}`, {
          headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
          return res.data
      })
      .catch(err => {
        console.log(err)
      })
}
export const uploadAvatar = (id, newAvatar) => {
  return axios
    .post(`/users/profileImage/${id}`, newAvatar,{
      headers: {
        'Content-Type': 'multipart/form-data'
      } 
    })
    .then(response => {
      console.log(response)
    })
    .catch(err => {
        console.log(err)
    })
}
export const searchUser = (search) => {
  return axios
    .get(`/users/search/${search}`, {
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const countPosts = (id) => {
  return axios
    .get(`/users/posts/${id}`, {
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const countFollowers = (id) => {
  return axios
    .get(`/users/followers/${id}`, {
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateUser = (id,first_name,last_name,bio) => {
    return axios
    .put(`users/update/${id}/${first_name}/${last_name}/${bio}`)
    .catch(err => {
      console.log(err)
    })
}
