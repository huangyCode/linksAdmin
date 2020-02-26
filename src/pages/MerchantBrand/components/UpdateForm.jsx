import React, { useState } from 'react';
import { Form, Input, Modal, Select, InputNumber, TimePicker, Icon, Upload } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const UpdateForm = props => {
  const [form] = Form.useForm();
  const { updateModalVisible, onSubmit, onCancel, values } = props;
  let [picUrl, setPicUrl] = useState(values.picUrl);
  let [openTime, setOpenTime] = useState(values.openTime);
  let [closeTime, setCloseTime] = useState(values.closeTime);

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    fieldsValue.picUrl = picUrl;
    fieldsValue.openTime = openTime;
    fieldsValue.closeTime = closeTime;
    fieldsValue.id = values.id;
    onSubmit(fieldsValue);
  };

  const handleChange = info => {
    if (info.file.status === 'done') {
      setPicUrl(
        (info.file.response && info.file.response.data && info.file.response.data.url) || '',
      );
    }
  };
  const onOpenChange = (e, timeString) => {
    console.log(timeString);
    setOpenTime(timeString);
  };
  const onCloseChange = (e, timeString) => {
    console.log(timeString);
    setCloseTime(timeString);
  };
  const uploadButton = (
    <div>
      <Icon type={'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <Modal
      destroyOnClose
      title="修改品牌"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} initialValues={props.values}>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="品牌名"
          name="name"
          rules={[
            {
              required: true,
              message: '不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="品牌图片"
        >
          <Upload
            action="http://120.55.60.49:9980/file/upload"
            className="avatar-uploader"
            listType="picture-card"
            showUploadList={false}
            multiple={true}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {picUrl ? <img src={picUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="配送需满金额"
          name="deliveryThreshold"
          rules={[
            {
              required: true,
              message: '不能为空',
            },
          ]}
        >
          <InputNumber placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="权重"
          name="weight"
          rules={[
            {
              required: true,
              message: '不能为空',
            },
          ]}
        >
          <InputNumber placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="描述"
          name="desc"
          rules={[
            {
              required: true,
              message: '不能为空',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="营业时间"
        >
          <>
            <TimePicker defaultValue={moment(openTime, 'HH:mm:ss')} onChange={onOpenChange} />-
            <TimePicker defaultValue={moment(closeTime, 'HH:mm:ss')} onChange={onCloseChange} />
          </>
        </FormItem>
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="开启状态"
          name="status"
        >
          <Select>
            <Option value={0}>开启</Option>
            <Option value={1}>关闭</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
