export const requestCollection = [
  {
    id: '0',
    title: 'POST',
    preRequestScript: '',
    v: '',
    headers: [],
    name: '',
    body: { contentType: 'application/json', body: JSON.stringify({ name: 'zt' }) } as any,
    auth: { authActive: false, authType: 'none' } as any,
    testScript: '',
    endpoint: '{{url}}/post',
    method: 'POST',
    params: [],
    inherited: true,
    inheritedEndpoint: '{{url}}/put',
    inheritedMethod: 'PUT',
  },
  {
    id: '1',
    title: 'GET',
    preRequestScript: '',
    v: '',
    headers: [],
    name: '',
    body: { contentType: 'application/json', body: '' } as any,
    auth: { authActive: false, authType: 'none' } as any,
    testScript: '',
    endpoint: '{{url}}/get',
    method: 'GET',
    params: [],
    inherited: true,
    inheritedEndpoint: '{{url}}/put',
    inheritedMethod: 'PUT',
  },
];
