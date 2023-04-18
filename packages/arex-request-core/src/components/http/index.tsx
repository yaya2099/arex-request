import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import { FC, useContext, useEffect } from 'react';

import { Context } from '../../providers/ConfigProvider';
import HttpRequest from './components/http/Request';
import HttpRequestOptions from './components/http/RequestOptions';
import HttpResponse from './components/http/Response';
import { Environment } from './data/environment';
import { HoppRESTRequest } from './data/rest';
import { HoppRESTResponse } from './helpers/types/HoppRESTResponse';
import { PostmanTestResult } from './helpers/types/PostmanTestResult';

export interface HttpProps {
  environment: Environment;
  theme: 'dark' | 'light';
  value: HoppRESTRequest | null;
  breadcrumb: any;
  onSend: (
    r: HoppRESTRequest,
  ) => Promise<{ response: HoppRESTResponse; testResult: PostmanTestResult }>;
  onSave: (r: HoppRESTRequest) => void;
  config: any;
  onChangeEditState: (r: boolean) => void;
}

const Http: FC<HttpProps> = ({
  value,
  onSend,
  environment,
  onSave,
  theme,
  breadcrumb,
  onChangeEditState,
}) => {
  const { store, dispatch } = useContext(Context);
  useEffect(() => {
    dispatch((state) => {
      if (value && JSON.stringify(value) !== '{}') {
        state.request = value;
        // state.request.headers.push({ key: 'xxxxxxxx', value: 'xxxxxxxx' });
      }
    });
  }, [value]);
  return (
    <Allotment
      css={css`
        height: 100%;
        .ant-tabs-content {
          height: 100%;
          .ant-tabs-tabpane {
            height: inherit;
            overflow: auto;
          }
        }
      `}
      vertical={true}
    >
      <Allotment.Pane preferredSize={360}>
        {store.request.method !== '' ? (
          <div
            css={css`
              height: 100%;
              display: flex;
              flex-direction: column;
            `}
          >
            <HttpRequest onSave={onSave} onSend={onSend}></HttpRequest>
            <HttpRequestOptions />
          </div>
        ) : null}
      </Allotment.Pane>
      <Allotment.Pane>
        <HttpResponse />
      </Allotment.Pane>
    </Allotment>
  );
};

export default Http;
