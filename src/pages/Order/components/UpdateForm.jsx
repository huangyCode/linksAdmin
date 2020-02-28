import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Modal,
  Select,
  Upload,
  Icon,
  message,
  InputNumber,
  Drawer,
  Row,
  Col,
  Button,
} from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    notification.error({
      description: 'You can only upload JPG/PNG file!',
      message: '图片类型错误',
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification.error({
      description: 'Image must smaller than 2MB!',
      message: '图片超大',
    });
  }
  return isJpgOrPng && isLt2M;
}

const CreateForm = props => {
  const { updateModalVisible, onSubmit, onCancel, values } = props;
  let [status, setStatus] = useState(values.status);

  const okHandle = async () => {
    let obj = { orderCode: values.code, status: Number(values.status) + 1 };
    onSubmit(obj);
  };
  const cancelhandle = async () => {
    let obj = { orderCode: values.code, status: 6 };
    onSubmit(obj);
  };
  const changeStatus = e => {
    setStatus(e);
  };
  return (
    <Drawer
      width={720}
      title="订单信息"
      placement="right"
      closable={false}
      onClose={() => {
        onCancel();
      }}
      visible={updateModalVisible}
    >
      <div>下单店铺：{values.brandName}</div>
      <div>订单编号：{values.code}</div>
      <div>下单时间：{values.createTime}</div>
      <div>下单用户：{values.buyerName}</div>
      <div>用户电话：{values.buyerPhone}</div>
      <div>
        支付状态：
        {values.payStatus == 0
          ? '已支付'
          : values.payStatus == 1
          ? '未支付'
          : values.payStatus == 2
          ? '已退款'
          : '已取消'}
      </div>
      <h3 style={{ marginTop: 10 }}>订单商品</h3>
      {values.orderGoodsList &&
        values.orderGoodsList.map(value => {
          return (
            <Row>
              <Col span={6}>{value.productType + ': ' + value.productName}</Col>
              <Col span={6}>x {value.productNumber}</Col>
              <Col span={6}>{value.productPrice} 元</Col>
            </Row>
          );
        })}
      <div style={{ marginTop: 5, marginBottom: 5 }}>总价：{values.amount}</div>
      <div style={{ marginBottom: 10 }}>备注：{values.desc || '暂无信息'}</div>
      <div>
        <span>
          订单状态：
          {values.status == 0
            ? '等待商家确认'
            : values.status == 1
            ? '已接单'
            : values.status == 2
            ? '配餐完成'
            : values.status == 3
            ? '配送中'
            : values.status == 4
            ? '订单完成'
            : values.status == 5
            ? '已取消'
            : '商家取消'}
        </span>
        {values.payStatus == 0 &&
        (values.status == 0 || values.status == 1 || values.status == 2 || values.status == 3) ? (
          <Button style={{ marginLeft: 10 }} type="primary" onClick={okHandle}>
            {values.status == 0
              ? '商家接单'
              : values.status == 1
              ? '配餐完成'
              : values.status == 2
              ? '去配送'
              : values.status == 3
              ? '订单完成'
              : ''}
          </Button>
        ) : null}
        {values.payStatus == 0 && !(values.status == 5 || values.status == 6) ? (
          <Button style={{ marginLeft: 10 }} type="primary" onClick={cancelhandle}>
            退款取消订单
          </Button>
        ) : null}
      </div>
    </Drawer>
  );
};

export default CreateForm;
