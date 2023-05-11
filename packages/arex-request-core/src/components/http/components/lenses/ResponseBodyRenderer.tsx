import { css } from '@emotion/react';
import { Tabs } from 'antd';
import { FC } from 'react';
import React from 'react';

import { HoppRESTResponse } from '../../helpers/types/HoppRESTResponse';
import Console from '../http/Console';
import TestResult from '../http/TestResult';
import LensesHeadersRenderer from './HeadersRenderer';
import JSONLensRenderer from './renderers/JSONLensRenderer';
import RawLensRenderer from './renderers/RawLensRenderer';

const LensesResponseBodyRenderer: FC<{
  response: HoppRESTResponse;
  testResult: any;
  consoles: any[];
}> = ({ response, testResult, consoles }) => {
  const items = [
    {
      label: 'JSON',
      key: '0',
      children: <JSONLensRenderer response={response} />,
    },
    // {
    //   label: 'Body',
    //   key: 'Body',
    //   children: <BodySegmented response={response} />,
    // },
    {
      label: 'Raw',
      key: '1',
      children: <RawLensRenderer response={response} />,
    },
    {
      label: 'Headers',
      key: '2',
      // @ts-ignore
      children: <LensesHeadersRenderer headers={response.headers} />,
    },
    {
      label: 'Result',
      key: '3',
      children: <TestResult testResult={testResult} />,
    },
    {
      label: 'Console',
      key: '4',
      children: <Console logs={consoles} />,
    },
  ];
  return (
    <div
      css={css`
        flex: 1;
      `}
    >
      <Tabs style={{ height: '100%' }} items={items} />
    </div>
  );
};

export default LensesResponseBodyRenderer;
