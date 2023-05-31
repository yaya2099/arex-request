import { css } from '@emotion/react';
import { Editor } from '@monaco-editor/react';
import React, { FC } from 'react';

import { ArexRESTResponse } from '../../../helpers/types/ArexRESTResponse';
const RawLensRenderer: FC<{ response: ArexRESTResponse }> = ({ response }) => {
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
        value={response.type === 'success' ? response.body.toString() : ''}
      />
    </div>
  );
};

export default RawLensRenderer;
