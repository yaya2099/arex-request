import React from 'react'
import MainBox from '../components/MainBox'
import Dashboard from '../pages/Dashboard'
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Ex404 from '../pages/exception/404'
import Repo from '../pages/Repo';
import RepoCoverageReport from '../pages/RepoCoverageReport';
import Admin from '../pages/admin';
export default [
  {
    path: '/',
    element: <MainBox />,
    children: [
      {
        path: '/:group/:repo',
        element: <Repo />,
      },
      {
        path: '/:group/:repo/:commitSha',
        element: <RepoCoverageReport />,
      },
      {
        path: '/:group/:repo/:commitSha/:reportId',
        element: <RepoCoverageReport />,
      },
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/user',
        element: <Admin />,
      },
      {
        path: '*',
        element: <Ex404 />,
      },
    ],
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/login',
    element: <Login />,
  }
]
