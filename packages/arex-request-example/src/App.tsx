import { css } from '@emotion/react';
import { ConfigProvider, theme } from 'antd';

import useDarkMode from './hooks/use-dark-mode';
import MainBox from './layouts/MainBox';
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
  return (
    <div
      className='App'
      css={css`
        height: 100vh;
      `}
    >
      <ConfigMiddlewareProvider>
        <MainBox />
      </ConfigMiddlewareProvider>
    </div>
  );
}

export default App;
