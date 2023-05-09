import { EditOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Breadcrumb, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
interface SmartBreadcrumbProps {
  items: { title: string }[];
  onChangeTitle: ({ value }: { value: string }) => void;
}
const SmartBreadcrumb: FC<SmartBreadcrumbProps> = ({ items, onChangeTitle }) => {
  const [mode, setMode] = useState('normal');
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(items.at(-1)?.title || '');
  }, []);
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        //border: 1px solid salmon;
        width: 100%;
        &:hover {
          //border: 1px solid black;
          .test123 {
            display: inline-block !important;
          }
        }
      `}
    >
      {mode === 'normal' ? (
        <>
          <Breadcrumb items={items} />
          <div
            className={'test123'}
            css={css`
              margin-left: 10px;
              display: none;
              cursor: pointer;
            `}
          >
            <EditOutlined
              onClick={() => {
                setMode('edit');
              }}
            />
          </div>
        </>
      ) : (
        <Input
          value={value}
          onChange={(val) => {
            setValue(val.target.value);
          }}
          onBlur={() => {
            setMode('normal');
            onChangeTitle({ value });
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              setMode('normal');
              onChangeTitle({ value });
            }
          }}
        />
      )}
    </div>
  );
};

export default SmartBreadcrumb;
