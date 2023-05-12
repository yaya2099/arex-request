import { css } from '@emotion/react';
import { theme } from 'antd';
const { useToken } = theme;
const AppFooter = () => {
  const theme1 = useToken();
  return (
    <div
      css={css`
        height: 36px;
        border-top: 1px solid ${theme1.token.colorBorder};
      `}
    ></div>
  );
};

export default AppFooter;
