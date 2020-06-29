import axios from 'axios'

export const PostReport = (report) => {
    return axios
        .post(`/post_reports/create`, {
            users_id: report.users_id,
            posts_id: report.posts_id,
            description: report.description,
            type_id: report.type_id,
        }).then(response => {
           return response.data
        })
}
export const UserReport = (report) => {
    return axios
        .post(`/user_reports/create`, {
            user_reporter: report.user_reporter,
            user_reported: report.user_reported,
            description: report.description,
            type_id: report.type_id
        }).then(response => {
            return response.data
        })
}