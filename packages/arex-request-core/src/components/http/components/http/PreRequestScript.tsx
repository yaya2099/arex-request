import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Editor } from '@arextest/monaco-react';
import { Button, theme, Typography } from 'antd';
import React, { useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Context } from '../../../../providers/ConfigProvider';
import { preTestCodeSnippet } from './snippets';
const { Text } = Typography;

export const ResponseTestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  & > span:first-of-type {
    font-size: 13px;
    line-height: 32px;
    font-weight: 500;
    color: #9d9d9d;
  }
`;

export const ResponseTestWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
  flex: 1;
  & > div:last-of-type {
    width: 35%;
    text-align: left;
    padding-left: 20px;
  }
`;
const { useToken } = theme;
const HttpPreRequestScript = () => {
  const { store, dispatch } = useContext(Context);
  const { t } = useTranslation();
  const theme = useToken();

  const ThemeColorPrimaryButton = styled(Button)`
    color: ${(props) => theme.token.colorPrimary} !important;
  `;
  const codeSnippet = preTestCodeSnippet;

  const addTest = (text: string) => {
    dispatch((state) => {
      state.request.preRequestScript = state.request.preRequestScript += text;
    });
  };

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <ResponseTestHeader>
        <span>{t('preRequest.javascript_code')}</span>
        <div></div>
      </ResponseTestHeader>
      <ResponseTestWrapper>
        <div
          css={css`
            min-width: 0;
            flex: 1;
          `}
        >
          <Editor
            theme={store.theme === 'dark' ? 'vs-dark' : 'light'}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 12,
              wordWrap: 'wordWrapColumn',
              automaticLayout: true,
              fontFamily: 'IBMPlexMono, "Courier New", monospace',
              scrollBeyondLastLine: false,
            }}
            language={'javascript'}
            value={store.request.preRequestScript}
            onChange={(value) => {
              dispatch((state) => {
                if (value!==undefined) {
                  state.request.preRequestScript = value;
                }
              });
            }}
          />
        </div>

        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <Text
            type={'secondary'}
            css={css`
              margin-bottom: 4px;
            `}
          >
            Test scripts are written in JavaScript, and are run after the response is received.
          </Text>
          <div>
            <a
              css={css`
                color: ${theme.token.colorPrimary};
              `}
              type='text'
              onClick={() =>
                window.open(
                  'https://learning.postman.com/docs/writing-scripts/pre-request-scripts/',
                )
              }
            >
              Read documentation
            </a>
          </div>
          <Text
            type={'secondary'}
            css={css`
              padding: 16px 0;
            `}
          >
            Snippets
          </Text>
          <div
            css={css`
              overflow: auto;
              flex: 1;
            `}
          >
            {codeSnippet.map((e, i) => (
              <ThemeColorPrimaryButton type='text' key={i} onClick={() => addTest(e.text)}>
                {e.name}
              </ThemeColorPrimaryButton>
            ))}
          </div>
        </div>
      </ResponseTestWrapper>
    </div>
  );
};

export default HttpPreRequestScript;
