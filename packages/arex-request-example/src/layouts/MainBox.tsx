import { css } from '@emotion/react';
import { theme } from 'antd';
import { Http, HttpProps } from 'arex-request-core';
import { useMemo, useState } from 'react';

import AppFooter from '../components/app/Footer';
import AppHeader from '../components/app/Header';
import { sendRequest } from '../helpers/postman';
import useDarkMode from '../hooks/use-dark-mode';
import { requestCollection } from '../mocks/requestCollection';
const { useToken } = theme;
const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        disabled: true,
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
      },
    ],
  },
];
const MainBox = () => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const darkMode = useDarkMode();
  const theme1 = useToken();
  const onSave: HttpProps['onSave'] = (r) => {
    console.log(r);
  };
  const [selectedKey, setSelectedKey] = useState('0');
  function onSend(request: any, environment: any) {
    return sendRequest(request, environment).then((res: any) => {
      return {
        response: res.response,
        testResult: res.testResult,
        consoles: res.consoles,
        visualizer: res.visualizer,
      };
    });
  }
  // request
  const testReqaData = useMemo(() => {
    return requestCollection.find((r) => r.id === selectedKey);
  }, [selectedKey]);
  // collection
  const httpConfig = useMemo(
    () => ({
      requestTabs: {
        extra: [
          {
            label: 'Mock',
            key: 'mock',
            hidden: true,
            children: <div>mock</div>,
          },
          // {
          //   label: t('http.compare_config'),
          //   key: 'compareConfig',
          //   hidden: nodeType === 2,
          //   children: (
          //     <ExtraTabs.RequestTabs.CompareConfig
          //       interfaceId={id}
          //       operationId={data?.operationId}
          //     />
          //   ),
          // },
        ],
      },
      responseTabs: {
        extra: [],
      },
    }),
    [testReqaData],
  );
  // @ts-ignore
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
            collection={treeData}
            height={'100%'}
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
            environment={{
              name: 'dev',
              variables: [{ key: 'url', value: 'http://124.223.27.177:18080' }],
            }}
            config={httpConfig}
            breadcrumbItems={[{ title: 'Test' }, { title: 'hoppscotch' }, { title: 'echo' }]}
            // @ts-ignore
            onChange={({ value, tags, description }) => {
              console.log(value, tags, description);
            }}
            tags={['sd']}
            tagOptions={[{ color: 'blue', value: 'sd', label: 'd' }]}
            description={'description'}
            onSaveAs={(val) => {
              return new Promise((resolve) => {
                resolve(true);
              });
            }}
          />
        </div>
      </div>
      <AppFooter></AppFooter>
    </div>
  );
};

export default MainBox;
