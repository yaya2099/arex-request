import Icon, { UsergroupAddOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import PM from 'postman-collection';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import IconGripVertical from '~icons/lucide/grip-vertical';

import { converToUrl, removePMparams } from './helpers';
interface ItemType {
  id: number;
  key: string;
  value: string;
}

const Welcome: FC = () => {
  const [endpoint, setEndpoint] = useState('https://hoppscotch.io/');

  const [params, setParams] = useState<ItemType[]>([
    { id: 0, key: 'name', value: 'zt' },
    { id: 1, key: 'age', value: '18' },
  ]);

  useEffect(() => {
    const query = PM.Url.parse(endpoint).query || [];
    if (
      JSON.stringify(query) !== JSON.stringify(params.map(({ key, value }) => ({ key, value })))
    ) {
      if (typeof query !== 'string') {
        // console.log(query.map(({ key, value },index) => ({ key, value:value||'',index })))
        const x = query.map(({ key, value }, index) => ({ key, value: value || '', id: index }));
        setParams(x);
      }
    }
  }, [endpoint]);

  useMemo(() => {
    const endpointParse = PM.Url.parse(endpoint);
    const endpointParseCopy = removePMparams(endpointParse);
    setEndpoint(endpointParseCopy.toString() + converToUrl(params));
  }, [params]);

  return (
    <div
      css={css`
        input {
          border: none;
          border: 0.5px solid silver;
        }
        input:focus {
          outline: none;
        }
      `}
    >
      <input
        css={css`
          width: 500px;
          font-size: 16px;
          padding: 5px;
        `}
        type='text'
        value={endpoint}
        onChange={(val) => {
          setEndpoint(val.target.value);
        }}
      />
      <div
        css={css`
          height: 20px;
        `}
      ></div>
      {/*header*/}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <label className='font-semibold truncate text-secondaryLight'>头</label>

        <div>
          <UsergroupAddOutlined
            css={css`
              cursor: pointer;
            `}
            onClick={() => {
              setParams(params.concat([{ value: '', key: '', id: params.length }]));
            }}
          />
        </div>
      </div>
      <ReactSortable
        animation={250}
        handle={'.handle'}
        list={params}
        setList={setParams}
        css={css`
          border: 0.5px solid silver;
          display: flex;
          flex-direction: column;
        `}
      >
        {params.map((item) => (
          <div
            key={item.id}
            css={css`
              display: flex;
            `}
          >
            <div
              className={'handle'}
              css={css`
                padding: 10px;
                border: 0.5px solid silver;
                cursor: grab;
              `}
            >
              <Icon component={IconGripVertical} css={css``} />
            </div>
            <input
              css={css`
                flex: 1;
              `}
              type={'text'}
              value={item.key}
              onChange={(val) => {
                const s = JSON.parse(JSON.stringify(params));
                const newValue = s.find((i) => i.id === item.id);
                newValue.key = val.target.value;
                setParams(s);
              }}
            />

            <input
              css={css`
                flex: 1;
              `}
              type={'text'}
              value={item.value}
              onChange={(val) => {
                const s = JSON.parse(JSON.stringify(params));
                const newValue = s.find((i) => i.id === item.id);
                newValue.value = val.target.value;
                setParams(s);
              }}
            />
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default Welcome;
