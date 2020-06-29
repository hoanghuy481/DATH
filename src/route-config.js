import React from 'react';

import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import AnotherUserPage from './pages/AnotherUserPage'
import FollowersPage from './pages/FollowersPage'
import FollowingPage from './pages/FollowingPage'
import UploadPage from './pages/UploadPage';
import UpdatePostPage from './pages/UpdatePostPage';
import PlaylistPage from './pages/PlaylistPage';
import PostDetailPage from './pages/PostDetailPage';
import SearchUsersPage from './pages/SearchUsersPage';
import SearchPostsPage from './pages/SearchPostsPage';
import SearchPage from './pages/SearchPage';
import AboutMePage from './pages/AboutMePage';
import NotiPage from './pages/NotiPage';
import PlaylistPageDetail from './pages/PlaylistPageDetail';
import PlaylistTop10Track from './pages/PlaylistTop10Track';

const routes=[
    {
        path: "/",
        exact: true,
        main: () => <HomePage/>
    },
    {
        path: '/my.profile/:uid',
        exact: true,
        main: ({match})=> <TimelinePage match={match}/>
    },
    {
        path: '/profile/:uid',
        exact: true,
        main: ({match})=> <AnotherUserPage match={match}/>
    },
    {
        path: '/followers/:uid',
        exact: true,
        main: ({match})=> <FollowersPage match={match}/>
    },
    {
        path: '/following/:uid',
        exact: true,
        main: ({match})=> <FollowingPage match={match}/>
    },
    {
        path: '/upload/:uid',
        exact: true,
        main: ({match})=> <UploadPage match={match}/>
    },
    {
        path: '/update/:id',
        exact: true,
        main: ({match})=> <UpdatePostPage match={match}/>
    },
    {
        path: '/list-playlist/:uid',
        exact: true,
        main: ({match})=> <PlaylistPage match={match}/>
    },
    {
        path: '/playlist/:id',
        exact: true,
        main: ({match})=> <PlaylistPageDetail match={match}/>
    },
    {
        path: '/playlist-top10/:id',
        exact: true,
        main: ({match})=> <PlaylistTop10Track match={match}/>
    },
    {
        path: '/track/:id',
        exact: true,
        main: ({match})=> <PostDetailPage match={match}/>
    },
    {
        path: '/searchusers/:search',
        exact: true,
        main: ({match})=> <SearchUsersPage match={match}/>
    },
    {
        path: '/searchposts/:search',
        exact: true,
        main: ({match})=> <SearchPostsPage match={match}/>
    },
    {
        path: '/search/:search',
        exact: true,
        main: ({match})=> <SearchPage match={match}/>
    },
    {
        path: '/about/:uid',
        exact: true,
        main: ({match})=> <AboutMePage match={match}/>
    },
    {
        path: '/noti',
        exact: true,
        main: ()=> <NotiPage/>
    },
    {
        path: '/login',
        exact: true,
        main: ()=> <LoginPage/>
    },
    {
        path: '/register',
        exact: true,
        main: ()=> <RegisterPage/>
    },
    {
        path: '',
        exact: true,
        main: ()=> <NotFoundPage/>
    }
];

export default routes;