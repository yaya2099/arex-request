import HttpIndex from './components/http';
import ConfigProvider from './providers/ConfigProvider';

const Http = (props: any) => {
  return (
    <ConfigProvider {...props}>
      <HttpIndex {...props} />
    </ConfigProvider>
  );
};

export default Http;
