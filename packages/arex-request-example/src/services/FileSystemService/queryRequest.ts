// import { request } from '../../utils';

import request from '../../utils/request';

export type CreateWorkspaceReq = {
  userName: string;
  workspaceName: string;
};

export type CreateWorkspaceRes = {
  infoId: string;
  workspaceId: string;
  success: boolean;
};

export default async function queryRequest({ id, nodeType }: any) {
  return request
    .post<any>(`/report/filesystem/queryInterface`, { id })
    .then((res) => Promise.resolve(res.body));
}
