import { css, useTheme } from '@emotion/react';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import { ConfigProvider as RequestConfigProvider, Http } from 'arex-request-core';
import { Collection } from 'arex-request-core';
import { useMemo, useState } from 'react';

import AppFooter from '../components/app/Footer';
import AppHeader from '../components/app/Header';
import { sendRequest } from '../helpers/postman';
import useDarkMode from '../hooks/use-dark-mode';
import { queryWorkspaceById } from '../services/FileSystemService';
import queryRequest from '../services/FileSystemService/queryRequest';

const MainBox = () => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const darkMode = useDarkMode();
  const theme1 = useTheme();
  function onSave(r: any) {
    localStorage.setItem('req', JSON.stringify(r));
    message.success('保存成功');
  }
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedKeyNodeType, setSelectedKeyNodeType] = useState('');
  function onSend(request: any, environment: any) {
    return sendRequest(request, environment).then((res: any) => {
      return {
        response: res.response,
        testResult: res.testResult,
      };
    });
  }
  // request
  const { data: data1 } = useRequest(
    () => {
      return queryRequest({ id: selectedKey, nodeType: 1 });
    },
    {
      refreshDeps: [selectedKey, selectedKeyNodeType],
    },
  );
  const testReqaData = useMemo(() => {
    return {
      preRequestScript: '',
      v: '',
      headers: [],
      name: '',
      body: { contentType: 'application/json', body: '' } as any,
      auth: { authActive: false, authType: 'none' } as any,
      testScript: '',
      endpoint: data1?.address?.endpoint || '',
      method: data1?.address?.method || '',
      params: [],
    };
  }, [data1]);
  // collection
  const { data } = useRequest(() => {
    return queryWorkspaceById({ id: '644a282d3867983e29d1b8f5' });
  });
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
        >
          <Collection
            treeData={data || []}
            onSelect={(keys) => {
              if (keys.length > 0) {
                setSelectedKey(keys[0] as string);
              }
            }}
          />
        </div>
        <div
          css={css`
            width: 100%;
          `}
        >
          <Http
            onSend={(request) => {
              return onSend(request, {
                name: 'dev',
                variables: [{ key: 'url', value: 'https://m.weibo.cn' }],
              });
            }}
            onSave={onSave}
            value={testReqaData}
            breadcrumb={<div></div>}
            environment={{ name: 'dev', variables: [{ key: 'url', value: 'https://m.weibo.cn' }] }}
            config={{}}
          />
        </div>
      </div>
      <AppFooter></AppFooter>
    </RequestConfigProvider>
  );
};

export default MainBox;
