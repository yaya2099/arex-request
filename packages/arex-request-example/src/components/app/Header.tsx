import { css } from '@emotion/react';
import { useTheme } from '@emotion/react';
import { Button, theme } from 'antd';
import { useEffect } from 'react';
const { useToken, darkAlgorithm } = theme;
const AppHeader = ({ onChangeLocale, locale, onChangeTheme, theme }: any) => {
  const theme1 = useTheme();
  return (
    <div
      css={css`
        height: 36px;
        border-bottom: 1px solid ${theme1.colorBorder};
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
      `}
    >
      {/*左*/}
      <div></div>

      {/*右*/}
      <div>
        {locale === 'cn' && (
          <Button
            onClick={() => {
              onChangeLocale('en');
            }}
            css={css`
              padding: 0 !important;
              text-align: center;
              width: 28px;
              margin-left: 10px;
            `}
            size={'small'}
          >
            EN
          </Button>
        )}
        {locale === 'en' && (
          <Button
            onClick={() => {
              onChangeLocale('cn');
            }}
            css={css`
              padding: 0 !important;
              text-align: center;
              width: 28px;
              margin-left: 10px;
            `}
            size={'small'}
          >
            中
          </Button>
        )}

        {/*主题设置*/}
        {theme === 'light' && (
          <Button
            onClick={() => {
              onChangeTheme('dark');
            }}
            css={css`
              padding: 0 !important;
              text-align: center;
              width: 28px;
              margin-left: 10px;
            `}
            size={'small'}
          >
            D
          </Button>
        )}
        {theme === 'dark' && (
          <Button
            onClick={() => {
              onChangeTheme('light');
            }}
            css={css`
              padding: 0 !important;
              text-align: center;
              width: 28px;
              margin-left: 10px;
            `}
            size={'small'}
          >
            L
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
