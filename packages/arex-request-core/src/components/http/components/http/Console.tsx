import { css, useTheme } from '@emotion/react';
import { FC } from 'react';
import ReactJson from 'react-json-view';

const Console: FC<{ logs: any[] }> = ({ logs }) => {
  const theme = useTheme();
  return (
    <div
      css={css`
        border-left: 1px solid ${theme.colorBorder};
        border-top: 1px solid ${theme.colorBorder};
      `}
    >
      {logs.map((log, index) => {
        return (
          <div
            key={index}
            css={css`
              display: flex;
            `}
          >
            {log.map((l: any) => {
              return typeof l === 'object' ? (
                <div
                  css={css`
                    border-right: 1px solid ${theme.colorBorder};
                    border-bottom: 1px solid ${theme.colorBorder};
                    padding: 10px;
                    flex: 1;
                  `}
                >
                  <ReactJson collapsed={1} name={false} src={l}></ReactJson>
                </div>
              ) : (
                <div
                  css={css`
                    flex: 1;
                    padding: 10px;
                    border-right: 1px solid ${theme.colorBorder};
                    border-bottom: 1px solid ${theme.colorBorder};
                  `}
                >
                  <span>{l}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Console;
