import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { List, Progress, Tag, Typography } from 'antd';
import { FC } from 'react';

// import { HoppTestResult } from '../../helpers/types/HoppTestResult';
const { Text, Link } = Typography;

const testResultWrap = css`
  padding: 10px;
  padding-bottom: 0;
`;
const TestResult: FC<{ testResult: any }> = ({ testResult }) => {
  return (
    <div>
      {testResult.map((t: any, index: number) => {
        if (t.passed) {
          return (
            <div css={testResultWrap} key={index}>
              <Tag color={'#0cbb52'}>成功</Tag>
              <Text type='secondary' css={css`  font-size: 12px !important;`}>{t.name}</Text>
              {/*<Text*/}
            </div>
          );
        } else {
          return (
            <div css={testResultWrap} key={index}>
              <Tag color={'#eb2013'}>失败</Tag>
              <Text type='secondary' css={css`  font-size: 12px !important;`}>
                {t.name} | AssertionError: {t.error.message}
              </Text>
              {/*<Text*/}
            </div>
          );
        }
      })}
    </div>
  );
};

export default TestResult;
