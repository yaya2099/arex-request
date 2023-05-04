// import { request } from '../../utils';

import request from '../../utils/request';

export type AddItemFromRecordReq = {
  workspaceId: string;
  parentPath: {
    title: string;
    key: string;
    nodeType: number;
  }[];
  nodeName: string;
  recordId: string;
  userName: string;
  operationId: string;
};
export async function addItemFromRecord(params: AddItemFromRecordReq) {
  return request
    .post<{ success: boolean }>('/report/filesystem/addItemFromRecord', params)
    .then((res) => res.body);
}
