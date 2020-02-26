import React from 'react';
import {Form, Input, Modal, Select, InputNumber} from 'antd';
const FormItem = Form.Item;
const {Option} = Select;
const CreateForm = props => {
  const [form] = Form.useForm();
  const {updateModalVisible, onSubmit, onCancel} = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    fieldsValue.id = props.values.id;
    form.resetFields();
    onSubmit(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title={'修改类型'}
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
    >
      <Form
        form={form}
        initialValues={{
          name: props.values.name || '',
          weight: props.values.weight || '',
          status: props.values.status,
        }}
      >
        <FormItem
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 15,
          }}
          label="类型名"
          name="name"
          rules={[
            {
              required: true,
              message: '不能为空！',
            },
          ]}
        >
          <Input placeholder="请输入"/>
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
          <InputNumber placeholder="请输入"/>
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
            <Option value={0}>关闭</Option>
            <Option value={1}>开启</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
