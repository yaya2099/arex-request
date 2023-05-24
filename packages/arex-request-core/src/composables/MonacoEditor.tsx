import { css } from '@emotion/react';
import { FC, useRef } from 'react';

import { useMonaco } from './monaco';

const MonacoEditor: FC<{ value: string }> = ({value}) => {
  const ref = useRef(null);
  useMonaco(ref, value, {
    extendedEditorConfig: {
      lineWrapping: true,
      mode: 'json',
      theme: 'store.theme',
    },
    onChange: (value: string) => {
      console.log(value, 'val');
    },
  });
  return (
    <div
      css={css`
        height: 200px;
      `}
      ref={ref}
    ></div>
  );
};

export default MonacoEditor;
