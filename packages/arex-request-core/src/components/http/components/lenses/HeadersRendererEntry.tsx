import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Col, Row, theme } from 'antd';
import { FC, useEffect } from 'react';
import React from 'react';

import { HoppRESTHeader } from '../../data/rest';

// import { HoppRESTHeader } from '../../helpers/data/rest';

// import { HoppRESTHeader } from '../../data/rest';

const Test = styled.div`
  border-right: 1px solid ${(props) => props.theme.colorBorder};
  border-bottom: 1px solid ${(props) => props.theme.colorBorder};
  padding: 6px;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
  height: 35px;
`;

const { useToken } = theme;
const LensesHeadersRendererEntry: FC<{ header: HoppRESTHeader }> = ({ header }) => {
  const token = useToken();
  return (
    <div>
      <Row>
        <Col className='gutter-row' span={12}>
          <Test>{header.key}</Test>
        </Col>

        <Col className='gutter-row' span={12}>
          <Test> {header.value}</Test>
        </Col>
      </Row>
    </div>
  );
};

export default LensesHeadersRendererEntry;
