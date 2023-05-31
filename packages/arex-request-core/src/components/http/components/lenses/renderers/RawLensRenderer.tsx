import { css } from '@emotion/react';
import { Editor } from '@monaco-editor/react';
import React, { FC, useContext, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Context } from '../../../../../providers/ConfigProvider';
import { ArexRESTResponse } from '../../../helpers/types/ArexRESTResponse';
const RawLensRenderer: FC<{ response: ArexRESTResponse }> = ({ response }) => {
  // console.log(response.body.toString(), 'response');
  const rawResponse = useRef(null);
  const { t } = useTranslation();
  const { store } = useContext(Context);

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 12,
          wordWrap: 'wordWrapColumn',
          automaticLayout: true,
          fontFamily: 'IBMPlexMono, "Courier New", monospace',
          scrollBeyondLastLine: false,
          readOnly: true,
        }}
        // language={'json'}
        value={response.type === 'success' ? response.body.toString() : ''}
      />
    </div>
  );
};

export default RawLensRenderer;
