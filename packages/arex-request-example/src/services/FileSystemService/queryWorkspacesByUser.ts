import request from '../../utils/request';
// import { request } from '../../../utils';

export default async function queryWorkspacesByUser(params: { userName: string }) {
  return request
    .post<{ workspaces: any[] }>(`/report/filesystem/queryWorkspacesByUser`, params)
    .then((res) => res.body.workspaces);
}
