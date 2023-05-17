import { FC } from 'react';

import HttpIndex, { HttpProps } from './components/http';
import ConfigProvider from './providers/ConfigProvider';

const Http: FC<HttpProps & { theme: string; language: string }> = (props) => {
  return (
    <ConfigProvider {...props}>
      <HttpIndex {...props} />
    </ConfigProvider>
  );
};

export default Http;
