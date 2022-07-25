import React from 'react';
import {Button, Form, Input} from 'antd';
import {YoutubeOutlined, SearchOutlined} from '@ant-design/icons';

const FormYT = ({onFinish, onFinishFailed, isLoading}) => {
  return (
    <Form name='basic' layout='inline' onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
      <Form.Item
        name='linkyt'
        style={{flexGrow: '1'}}
        rules={[
          {
            required: true,
            message: 'Please input youtube url!',
          },
          {type: 'url', warningOnly: true},
        ]}>
        <Input prefix={<YoutubeOutlined />} placeholder='Youtube url' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading} icon={<SearchOutlined />}>
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormYT;
