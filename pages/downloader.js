import React, {useState} from 'react';
import {Button, Checkbox, Form, Input, message, Col, Divider, Row, List, Skeleton} from 'antd';
import {YoutubeOutlined, SearchOutlined} from '@ant-design/icons';

import CustomLayout from '../components/layout/CustomLayout';
import {useLinksYT} from '../hooks/linksYT';
import YoutubeEmbed from '../components/layout/YoutubeEmbed';

export default function Downloader() {
  const {isLoading, getLinks} = useLinksYT();
  const [list, setList] = useState([]);

  const onFinish = async values => {
    message.success('Submit success!');
    const data = await getLinks(values.linkyt);
    setList(data);
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };
  return (
    <CustomLayout>
      <div>
        <h1>Downloader</h1>
        <p>This is the downloader page</p>
      </div>
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
      <Row>
        <Col span={24}>
          <Divider orientation='left'>Music List</Divider>
          <List
            style={{background: '#fff'}}
            grid={{gutter: 8, column: 5}}
            loading={isLoading}
            itemLayout='horizontal'
            dataSource={list}
            size='small'
            renderItem={item => (
              <List.Item>
                <Skeleton title={false} loading={isLoading} active>
                  <YoutubeEmbed embedId={item} />
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </CustomLayout>
  );
}
