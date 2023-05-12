import { css, useTheme } from '@emotion/react';
import { theme } from 'antd';
import { ConfigProvider as RequestConfigProvider, Http } from 'arex-request-core';
import { useMemo, useState } from 'react';

import AppFooter from '../components/app/Footer';
import AppHeader from '../components/app/Header';
import { sendRequest } from '../helpers/postman';
import useDarkMode from '../hooks/use-dark-mode';
import { requestCollection } from '../mocks/requestCollection';
const { useToken } = theme;
const MainBox = () => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const darkMode = useDarkMode();
  const theme1 = useToken();
  function onSave(r: any) {
    console.log(r);
  }
  const [selectedKey, setSelectedKey] = useState('0');
  function onSend(request: any, environment: any) {
    return sendRequest(request, environment).then((res: any) => {
      return {
        response: res.response,
        testResult: res.testResult,
        consoles: res.consoles,
      };
    });
  }
  // request
  const testReqaData = useMemo(() => {
    return requestCollection.find((r) => r.id === selectedKey);
  }, [selectedKey]);
  // collection
  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <AppHeader
        locale={locale}
        onChangeLocale={(selectedLocale: any) => {
          setLocale(selectedLocale);
        }}
        theme={theme}
        onChangeTheme={(selectedTheme: any) => {
          setTheme(selectedTheme);
          darkMode.toggle(selectedTheme === 'dark');
        }}
      ></AppHeader>
      <div
        css={css`
          display: flex;
          height: calc(100% - 74px);
        `}
      >
        <div
          css={css`
            width: 360px;
            border-right: 1px solid ${theme1.token.colorBorder};
          `}
        >
          <div
            css={css`
              padding: 10px;
            `}
          >
            {/*{selectedKey}*/}
            {requestCollection.map((r) => {
              return (
                <div
                  css={css`
                    margin-bottom: 5px;
                    padding: 5px;
                    border-radius: 5px;
                    background-color: ${selectedKey === r.id ? 'rgba(0,0,0,.1)' : 'none'};
                    &:hover {
                      background-color: rgba(0, 0, 0, 0.1);
                      cursor: pointer;
                    }
                  `}
                  key={r.id}
                  onClick={() => {
                    setSelectedKey(r.id);
                  }}
                >
                  {r.title}
                </div>
              );
            })}
          </div>
        </div>
        <div
          css={css`
            width: 100%;
          `}
        >
          <Http
            locale={locale}
            theme={theme}
            // 以上是配置
            onSend={(request) => {
              return onSend(request, {
                name: 'dev',
                variables: [{ key: 'url', value: 'http://124.223.27.177:18080' }],
              });
            }}
            onSave={onSave}
            // @ts-ignore
            value={testReqaData}
            breadcrumb={<div></div>}
            environment={{
              name: 'dev',
              variables: [{ key: 'url', value: 'http://124.223.27.177:18080' }],
            }}
            config={{}}
            breadcrumbItems={[{ title: 'Test' }, { title: 'hoppscotch' }, { title: 'echo' }]}
            onChangeTitle={() => {
              console.log('dddd');
            }}
          />
        </div>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
};

export default MainBox;
