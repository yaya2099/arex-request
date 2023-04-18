import { css, ThemeProvider } from '@emotion/react';
import { ConfigProvider, theme } from 'antd';

import useDarkMode from './hooks/use-dark-mode';
import MainBox from './layouts/MainBox';
const { useToken, darkAlgorithm } = theme;

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

const ThemeMiddlewareProvider = ({ children }:any) => {
  const token = useToken();
  return <ThemeProvider theme={token.token}>{children}</ThemeProvider>;
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
        <ThemeMiddlewareProvider>
          <MainBox></MainBox>
        </ThemeMiddlewareProvider>
      </ConfigMiddlewareProvider>
    </div>
  );
}

export default App;
