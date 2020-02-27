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
    let obj = { id: values.id, status };
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
      {/*productId: 1*/}
      {/*productName: "酒水"*/}
      {/*productNumber: 1*/}
      {/*productPrice: 100*/}
      {/*productType: "啤酒"*/}
      {/*productTypeId: 2*/}
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
        <span>订单状态：</span>
        <Select defaultValue={status} style={{ width: 150 }} onChange={changeStatus}>
          {values.status == 0 && (
            <Option value="0" disable>
              等待商家确认
            </Option>
          )}
          {(values.status == 0 || values.status == 1) && <Option value="1">已接单</Option>}
          {(values.status == 1 || values.status == 2) && <Option value="2">配餐完成</Option>}
          {(values.status == 2 || values.status == 3) && <Option value="3">配送中</Option>}
          {(values.status == 3 || values.status == 4) && <Option value="4">订单完成</Option>}
          {values.status == 5 && <Option value="5">已取消</Option>}
          {values.status == 6 && <Option value="6">支付后商家取消</Option>}
        </Select>
        <Button style={{ marginLeft: 10 }} type="primary" onClick={okHandle}>
          修改状态
        </Button>
      </div>
    </Drawer>
  );
};

export default CreateForm;
