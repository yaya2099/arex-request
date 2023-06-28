import React from 'react';

// import MainBox from '../components/MainBox';components
// import Dashboard from '../pages/Dashboard';
import MainBox from '../layouts/MainBox';
import Welcome from '../pages/Welcome';

export default [
  {
    path: '/',
    element: <MainBox />,
  },
  {
    path: '/Welcome',
    element: <Welcome />,
  },
];
