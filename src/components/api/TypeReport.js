import axios from 'axios'

export const getPostTypeRp = () => {
    return axios
        .get(`/report_types/postreporttype`, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data
        })
}

export const getUserTypeRp = () => {
  return axios
      .get(`/report_types/userreporttype`, {
          headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
          return res.data
      })
}


  