import { css } from '@emotion/react';
import { ConfigProvider, theme } from 'antd';
import { useRoutes } from 'react-router-dom';

import useDarkMode from './hooks/use-dark-mode';
import MainBox from './layouts/MainBox';
import routerConfig from './routers';
const { darkAlgorithm } = theme;

const ConfigMiddlewareProvider = ({ children }: any) => {
  const darkMode = useDarkMode();
  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode.value ? [darkAlgorithm] : [],
      }}
    >
      {children}
    </ConfigProvider>
  );
};

function App() {
  const routesContent = useRoutes(routerConfig);
  return (
    <div
      className='App'
      css={css`
        height: 100vh;
      `}
    >
      <ConfigMiddlewareProvider>{routesContent}</ConfigMiddlewareProvider>
    </div>
  );
}

export default App;
