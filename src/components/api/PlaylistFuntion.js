import axios from 'axios'

export const getPlaylist = async (id) => {
    return await axios
      .get(`/playlists/playlisted/${id}`, {
          headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
          return res.data
      })
}

export const getPlaylistDetail = (id) => {
  return axios
      .get(`/playlists/playlist/${id}`, {
         headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
          return res.data
      })
}


export const createPlaylist = newList => {
    return axios
        .post('/playlists/create', {
            title: newList.title,
            users_id: newList.users_id
        })
        .then(res => {
          return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const deletePlaylist = (uid,pid) => {
    return axios
      .delete(`/playlists/delete/${uid}/${pid}`, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
  