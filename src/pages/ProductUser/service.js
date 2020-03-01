import request from '@/utils/fetch';

export async function queryRule(params) {
  if (params.name) {
    params.productName = params.name;
    delete params.name;
  }
  let data = { page: params.current, size: params.pageSize, ...params };
  delete data.current;
  delete data.pageSize;
  data.brandId = localStorage.getItem('brandId'); // auto reload
  let res = await request('/product/getList', {
    method: 'POST',
    data,
  });
  let result = res.data;
  result.data = result.list;
  delete result.list;

  return result;
}

export async function queryBrand() {
  let res = await request('/brand/getAll', {
    method: 'GET',
  });
  return res.data;
}

export async function classesList() {
  let res = await request('/productSort/getAll', {
    method: 'POST',
  });
  return res.data;
}

export async function removeRule(uid) {
  return request('/account/delete', {
    method: 'GET',
    params: { uid },
  });
}

export async function addRule(params) {
  return request('/product/add', {
    method: 'POST',
    data: { ...params },
  });
}

export async function updateRule(params) {
  return request('/product/update', {
    method: 'POST',
    data: { ...params },
  });
}
