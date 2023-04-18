import { css, useTheme } from '@emotion/react';
import { message } from 'antd';
import { ConfigProvider as RequestConfigProvider, Http } from 'arex-request-core';
import { useState } from 'react';

import AppFooter from '../components/app/Footer';
import AppHeader from '../components/app/Header';
import { proxy } from '../helpers/postman';
import useDarkMode from '../hooks/use-dark-mode';
const defaultReq = {
  preRequestScript: '',
  v: '',
  headers: [],
  name: '',
  body: { contentType: 'application/json', body: '' },
  auth: { authActive: false, authType: 'none' },
  testScript: '',
  endpoint: '',
  method: 'GET',
  params: [],
};
const MainBox = () => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const darkMode = useDarkMode();
  const theme1 = useTheme();
  function onSave(r: any) {
    localStorage.setItem('req', JSON.stringify(r));
    message.success('保存成功');
  }
  function onSend(r: any) {
    return proxy(r).then((r1: any) => {
      return {
        response: r1.response,
        testResult: r1.testResult,
      };
    });
  }
  return (
    <RequestConfigProvider locale={locale} theme={theme}>
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
            border-right: 1px solid ${theme1.colorBorder};
          `}
        ></div>
        <div
          css={css`
            width: 100%;
          `}
        >
          <Http
            onSend={onSend}
            onSave={onSave}
            value={JSON.parse(localStorage.getItem('req') || JSON.stringify(defaultReq))}
            breadcrumb={<div></div>}
            environment={{ name: '', variables: [] }}
            config={{}}
            onChangeEditState={() => {
              console.log('');
            }}
            theme={'light'}
          />
        </div>
      </div>
      <AppFooter></AppFooter>
    </RequestConfigProvider>
  );
};

export default MainBox;
