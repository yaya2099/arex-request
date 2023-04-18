import { css } from '@emotion/react';
import { message } from 'antd';
import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useMonaco } from '../../../../composables/monaco';
import { Context } from '../../../../providers/ConfigProvider';

const HttpRawBody = (props:any, ref:any) => {
  const { store, dispatch } = useContext(Context);
  const { t } = useTranslation();
  useImperativeHandle(ref, () => {
    return {
      prettifyRequestBody: function () {
        prettifyRequestBody();
      },
    };
  });
  const prettifyRequestBody = () => {
    try {
      const jsonObj = JSON.parse(store.request.body.body as string);
      dispatch((state) => {
        state.request.body.body = JSON.stringify(jsonObj, null, 4);
      });
    } catch (e) {
      message.error(t('error.json_prettify_invalid_body'));
    }
  };
  const rawBodyParameters = useRef(null);
  useMonaco(rawBodyParameters, store.request.body.body as string, {
    extendedEditorConfig: {
      lineWrapping: true,
      mode: 'json',
      theme: store.theme,
    },
    onChange: (value: string) => {
      dispatch((state) => {
        state.request.body.body = value;
      });
    },
  });

  return (
    <div
      css={css`
        flex: 1;
        overflow-y: auto;
      `}
    >
      <div
        css={css`
          height: 100%;
        `}
        ref={rawBodyParameters}
      ></div>
    </div>
  );
};

export default forwardRef(HttpRawBody);
