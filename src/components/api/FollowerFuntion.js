import axios from 'axios'

export const getFollowers = (id) => {
    return axios
        .get(`/followers/followed/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const getFollowing = (id) => {
  return axios
      .get(`/followers/following/${id}`, {
          headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
          return res.data
      })
}

export const getCountFollowers = (id) => {
  return axios
      .get(`/followers/countfollowers/${id}`, {
          headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
          return res.data
      })
}


export const createFollow = newFollow => {
    return axios
        .post('/followers/create', {
            users_id: newFollow.users_id,
            user_follow_id: newFollow.user_follow_id
        })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const unFollow = (uid,pid) => {
    return axios
      .delete(`/followers/delete/${uid}/${pid}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  