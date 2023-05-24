import { css } from '@emotion/react';
import { Segmented, Space, Typography } from 'antd';
import { FC, useRef, useState } from 'react';
import ReactJson from 'react-json-view';

import MonacoEditor from '../../../composables/MonacoEditor';
const { Text, Link } = Typography;
enum TypeEnum {
  json = 'json',
  code = 'code',
}
interface RequestResultOverviewProps {
  dataSource: { type: TypeEnum; value: any; title: string }[];
}
const RequestResultOverview: FC<RequestResultOverviewProps> = ({ dataSource }) => {
  const [value, setValue] = useState<string | number>(dataSource[0].title);
  const rawBodyParameters = useRef(null);
  return (
    <div css={css`padding: 20px;border: 1px solid salmon`}>
      <div css={css`display: flex;justify-content: space-between;padding-bottom: 20px`}>
        <Segmented
          options={dataSource.map((i) => i.title)}
          value={value}
          onChange={(val) => {
            console.log(val);
            setValue(val);
          }}
        />

        <Space>
          <Text type='secondary'>200</Text>
          <Text type='secondary'>10ms</Text>
          <Text type='secondary'>762b</Text>
        </Space>
      </div>

      {dataSource.map((i,index) => {
        if (i.type === TypeEnum.code) {
          return <>{i.title === value && <MonacoEditor value={i.value} />}</>;
        } else if (i.type === TypeEnum.json) {
          return (
            <>
              {i.title === value && (
                <ReactJson
                  collapsed={2}
                  name={false}
                  src={i.value}
                />
              )}
            </>
          );
        } else {
          return <div key={index}>空</div>;
        }
      })}
    </div>
  );
};

export default RequestResultOverview;
