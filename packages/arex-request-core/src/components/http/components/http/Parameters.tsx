import Icon, { UsergroupAddOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import PM from 'postman-collection';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

// import IconGripVertical from '~icons/lucide/grip-vertical';
import { Context } from '../../../../providers/ConfigProvider';
import { converToUrl, removePMparams } from './helpers';
interface ItemType {
  id: number;
  key: string;
  value: string;
  active: boolean;
}

const HttpParameters: FC = () => {
  const { store, dispatch } = useContext(Context);
  const { endpoint } = store.request;
  // const setEndpoint = (newEndpoint: string) => {
  //   dispatch((state) => {
  //     state.request.endpoint = newEndpoint;
  //   });
  // };

  const { params } = store.request;
  const setParams = (newParams:any) => {
    dispatch((state) => {
      state.request.params = newParams;
    });
  };
  const newparams = useMemo(()=>{
    return params.map((p,index)=>({
      ...p,
      id:index
    }))
  },[params])
  // const [endpoint, setEndpoint] = useState('https://hoppscotch.io/');

  // const [params, setParams] = useState<ItemType[]>([
  //   { id: 0, key: 'name', value: 'zt' },
  //   { id: 1, key: 'age', value: '18' },
  // ]);

  useEffect(() => {
    const query = PM.Url.parse(endpoint).query || [];
    if (
      JSON.stringify(query) !== JSON.stringify(params.map(({ key, value }) => ({ key, value })))
    ) {
      if (typeof query !== 'string') {
        // @ts-ignore
        const x = query.map(({ key, value }, index) => ({
          key,
          value: value || '',
          active: true,
          id: index,
        }));
        setParams(x);
      }
    }
  }, [endpoint]);

  useEffect(() => {
    dispatch((state) => {
      const endpointParse = PM.Url.parse(endpoint);

      const endpointParseCopy = removePMparams(endpointParse);
      state.request.endpoint = endpointParseCopy.toString() + converToUrl(params);
    });
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
      {/*<p>{endpoint}</p>*/}
      {/*<input*/}
      {/*  css={css`*/}
      {/*    width: 500px;*/}
      {/*    font-size: 16px;*/}
      {/*    padding: 5px;*/}
      {/*  `}*/}
      {/*  type='text'*/}
      {/*  value={endpoint}*/}
      {/*  onChange={(val) => {*/}
      {/*    setEndpoint(val.target.value);*/}
      {/*  }}*/}
      {/*/>*/}
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
              setParams(newparams.concat([{ value: '', key: '', id: params.length, active: true }]));
            }}
          />
        </div>
      </div>
      <ReactSortable
        animation={250}
        handle={'.handle'}
        list={newparams}
        setList={setParams}
        css={css`
          border: 0.5px solid silver;
          display: flex;
          flex-direction: column;
        `}
      >
        {newparams.map((item) => (
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
              <UsergroupAddOutlined />
              {/*<Icon component={IconGripVertical} css={css``} />*/}
            </div>
            <input
              css={css`
                flex: 1;
              `}
              type={'text'}
              value={item.key}
              onChange={(val) => {
                const s = JSON.parse(JSON.stringify(newparams));
                const newValue = s.find((i:any) => i.id === item.id);
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
                const s = JSON.parse(JSON.stringify(newparams));
                const newValue = s.find((i:any) => i.id === item.id);
                newValue.value = val.target.value;
                setParams(s);
              }}
            />
            <span>{JSON.stringify(item.active)}</span>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default HttpParameters;
