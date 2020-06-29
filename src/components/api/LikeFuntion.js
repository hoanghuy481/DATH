import axios from 'axios'

export const getLike = (id) => {
    return axios
        .get(`/likes/liked/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}


export const createLike = newLike => {
    return axios
        .post('/likes/create', {
            posts_id: newLike.posts_id,
            users_id: newLike.users_id
        })
        .then(response => {
          console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const unLike = (uid,pid) => {
    return axios
      .delete(`/likes/delete/${uid}/${pid}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  