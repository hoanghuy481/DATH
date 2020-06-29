import axios from 'axios'

export const getComment = (id) => {
    return axios
        .get(`/comments/commented/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const createComment = newComment => {
    return axios
        .post('/comments/create', {
            comment: newComment.comment,
            posts_id: newComment.posts_id,
            users_id: newComment.users_id,
        })
        .then(response => {
          return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteComment = (id) => {
    return axios
      .delete(`/comments/delete/${id}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }