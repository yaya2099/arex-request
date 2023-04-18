import { css } from '@emotion/react';
import {useTheme} from "@emotion/react";

const AppFooter = () => {
  const theme1 = useTheme();
  return (
    <div
      css={css`
        height: 36px;
        border-top: 1px solid ${theme1.colorBorder};
      `}
    ></div>
  );
};

export default AppFooter;
