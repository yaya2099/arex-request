import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Breadcrumb, Button, Dropdown, Input, MenuProps, message, Select } from 'antd';
import { FC, useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Context } from '../../../../providers/ConfigProvider';
import SmartBreadcrumb from '../smart/Breadcrumb';
import SmartEnvInput from '../smart/EnvInput';

const HeaderWrapper = styled.div`
  display: flex;
  .ant-select-selector {
    border-radius: 0;
  }
`;

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
interface HttpRequestProps {
  onSave: any;
  onSend: any;
  breadcrumbItems: { title: string }[];
  onChangeTitle: ({ value }: { value: string }) => void;
}
const HttpRequest: FC<HttpRequestProps> = ({ onSave, onSend, onChangeTitle, breadcrumbItems }) => {
  const { store, dispatch } = useContext(Context);

  const { t } = useTranslation();
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
  };

  const items: MenuProps['items'] = [
    {
      label: '1st menu item',
      key: '1',
      icon: <UserOutlined />,
    },
    {
      label: '2nd menu item',
      key: '2',
      icon: <UserOutlined />,
    },
    {
      label: '3rd menu item',
      key: '3',
      icon: <UserOutlined />,
    },
  ];

  const handleRequest = ({ type }: any) => {
    dispatch((state) => {
      state.response = {
        type: 'loading',
      };
    });
    onSend(store.request).then((responseAndTestResult: any) => {
      dispatch((state) => {
        if (responseAndTestResult.response.type === 'success') {
          state.response = responseAndTestResult.response;
          state.testResult = responseAndTestResult.testResult;
          state.consoles = responseAndTestResult.consoles;
        }
      });
    });
  };
  return (
    <div
      css={css`
        padding: 0 12px;
        padding-top: 12px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        `}
      >
        <SmartBreadcrumb items={breadcrumbItems} onChangeTitle={onChangeTitle} />
        <div>
          <Button
            onClick={() => {
              const request = JSON.parse(JSON.stringify(store.request));
              if (request.body.contentType === '0') {
                request.body.body = '';
              }
              onSave(request);
            }}
          >
            {t('action.save')}
          </Button>
        </div>
      </div>
      <HeaderWrapper>
        <Select
          css={css`
            width: 120px;
            transform: translateX(1px);
          `}
          value={store.request.method}
          options={methods.map((i) => ({ value: i, lable: i }))}
          onChange={(value) => {
            dispatch((state) => {
              state.request.method = value;
            });
          }}
        />
        <SmartEnvInput
          value={store.request.endpoint}
          onChange={(v) => {
            dispatch((state) => {
              state.request.endpoint = v;
            });
          }}
        />

        <div
          css={css`
            margin: 0 0px 0 10px;
          `}
        >
          <Dropdown.Button
            onClick={() => handleRequest({ type: null })}
            type='primary'
            menu={{
              onClick: handleMenuClick,
              items: [],
            }}
            icon={<DownOutlined />}
          >
            {t('action.send')}
          </Dropdown.Button>
        </div>
      </HeaderWrapper>
    </div>
  );
};

export default HttpRequest;
