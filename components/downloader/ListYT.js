import React from 'react';
import {Col, Divider, Row, List, Skeleton} from 'antd';
import YoutubeEmbed from './YoutubeEmbed';

const ListYT = ({isLoading, list}) => {
  return (
    <Row>
      <Col span={24}>
        <Divider orientation='left'>Music List</Divider>
        <List
          style={{background: '#fff', minHeight: '166px'}}
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
  );
};

export default ListYT;
