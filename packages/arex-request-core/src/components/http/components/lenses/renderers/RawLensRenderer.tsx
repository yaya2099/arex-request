import { css } from '@emotion/react';
import React, { FC, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useMonaco } from '../../../../../composables/monaco';
import { Context } from '../../../../../providers/ConfigProvider';
// import { useMonaco } from '../../../../../../../composables/monaco';
import { ArexRESTResponse } from '../../../helpers/types/ArexRESTResponse';
const RawLensRenderer: FC<{ response: ArexRESTResponse }> = ({ response }) => {
  const rawResponse = useRef(null);
  const { t } = useTranslation();
  const { store } = useContext(Context);
  useMonaco(rawResponse, response.type === 'success' ? JSON.stringify(response.body) : '', {
    extendedEditorConfig: {
      lineWrapping: true,
      mode: 'txt',
      theme: store.theme,
      readOnly: true,
    },
    onChange: (value: string) => {
      console.log();
    },
  });
  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <div
        css={css`
          height: 100%;
        `}
        ref={rawResponse}
      ></div>
    </div>
  );
};

export default RawLensRenderer;
