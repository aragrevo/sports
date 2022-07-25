import React, {useState} from 'react';
import {DownloadOutlined} from '@ant-design/icons';
import {Button, Col, Space, Row} from 'antd';
import {message} from 'antd';

import {useLinksYT} from '../hooks/linksYT';
import CustomLayout from '../components/layout/CustomLayout';
import FormYT from '../components/downloader/FormYT';
import ListYT from '../components/downloader/ListYT';

export default function Downloader() {
  const {isLoading, downloading, getLinks, downloadMusic} = useLinksYT();
  const [list, setList] = useState([]);

  const onFinish = async values => {
    message.success('Submit success!');
    const data = await getLinks(values.linkyt);
    setList(data);
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  const onDownload = async () => {
    if (list.length === 0) {
      message.error('Please search first!');
      return;
    }
    const data = await downloadMusic(list);
    setList([]);
    message.success('Download success! ' + data);
  };
  return (
    <CustomLayout>
      <div>
        <h1>Downloader</h1>
        <p>This is the downloader page</p>
      </div>
      <FormYT onFinish={onFinish} onFinishFailed={onFinishFailed} isLoading={isLoading} />
      <Space direction='vertical' size='middle' style={{display: 'flex'}}>
        <ListYT isLoading={isLoading} list={list} />
        <Row>
          <Col span={24}>
            <Button
              disabled={list.length === 0}
              type='primary'
              icon={<DownloadOutlined />}
              loading={downloading}
              onClick={onDownload}
              style={{float: 'right'}}>
              Download
            </Button>
          </Col>
        </Row>
      </Space>
    </CustomLayout>
  );
}
