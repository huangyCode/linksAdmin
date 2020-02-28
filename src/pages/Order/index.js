import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, queryBrand, classesList, check, detail } from './service';
import MD5 from '@/utils/MD5';

/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    await updateRule(fields);
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const Order = () => {
  const [modalVisible, handleModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brandEum, setBrandEum] = useState({});
  const [classes, setClasses] = useState([]);
  const actionRef = useRef();
  const getBrand = async () => {
    let res = await queryBrand();
    let obj = {};
    for (let item of res) {
      obj[item.id] = item.name;
    }
    setBrandEum(obj);
    setBrands(res);
  };
  const getClasses = async () => {
    let res = await classesList();
    setClasses(res);
  };

  const audit = async ids => {
    await check({ ids, verifyStatus: 1 });
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  const onSubmit = async params => {
    if (params.brandName) {
      params.brandId = params.brandName;
      delete params.brandName;
    }
    params.page = 1;
    params.size = 10;
    queryRule(params);
  };
  useEffect(() => {
    getBrand();
    getClasses();
  }, []);
  const columns = [
    {
      title: '商铺品牌名',
      dataIndex: 'brandName',
      valueEnum: brandEum,
    },
    {
      title: '订单号',
      dataIndex: 'code',
    },
    {
      title: '价格',
      dataIndex: 'amount',
      render: (_, record) => <>{_}元</>,
      hideInSearch: true,
    },
    {
      title: '购买人',
      dataIndex: 'buyerName',
      hideInSearch: true,
    },
    {
      title: '购买电话',
      dataIndex: 'buyerPhone',
      hideInSearch: true,
    },
    //0 等待商家确认 1已接单 2做酒完成 3配送中 4 订单完成 5 已取消 6 支付后商家取消
    {
      title: '订单状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '等待商家确认',
          status: 'Default',
        },
        1: {
          text: '已接单',
          status: 'Processing',
        },
        2: {
          text: '做酒完成',
          status: 'Processing',
        },
        3: {
          text: '配送中',
          status: 'Processing',
        },
        4: {
          text: '订单完成',
          status: 'Success',
        },
        5: {
          text: '用户已取消',
          status: 'Error',
        },
        6: {
          text: '支付后商家取消',
          status: 'Error',
        },
      },
    },
    // 0 已支付 1 未支付 2 已退款 3 取消支付
    {
      title: '支付状态',
      dataIndex: 'payStatus',
      valueEnum: {
        0: {
          text: '已支付',
          status: 'Success',
        },
        1: {
          text: '未支付',
          status: 'Processing',
        },
        2: {
          text: '已退款',
          status: 'Error',
        },
        3: {
          text: '取消支付',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <a
          onClick={async () => {
            let res = await detail({ orderCode: record.code });
            console.log(res);
            setStepFormValues(res.data || {});
            handleUpdateModalVisible(true);
          }}
        >
          修改
        </a>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="商品列表"
        actionRef={actionRef}
        rowKey={record => record.id}
        request={params => queryRule(params)}
        columns={columns}
        onSubmit={onSubmit}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);

            if (success) {
              handleModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          brands={brands}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          classes={classes}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default Order;
