import request from '@/utils/fetch';
export async function queryRule(params) {
  let data = { page: params.current, size: params.pageSize };
  let res = await request('/userManage/getList', {
    method: 'POST',
    data,
  });
  let result = res.data;
  result.data = result.list;
  delete result.list;

  return result;
}
