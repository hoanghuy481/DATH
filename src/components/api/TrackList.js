import axios from 'axios'

export const getTracklist = (id) => {
    return axios
        .get(`/playlist_tracks/tracks/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const createTracklist = newList => {
    return axios
        .post('/playlist_tracks/create', {
          playlists_id: newList.playlists_id,
          posts_id: newList.posts_id
        })
        .then(res => {
          return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const deleteTracklist = (pid,tid) => {
    return axios
      .delete(`/playlist_tracks/delete/${pid}/${tid}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        return res.data
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  