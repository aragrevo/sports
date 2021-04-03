import { useEffect, useState } from 'react';
import Link from 'next/link';
import 'antd/dist/antd.css';
import Matches from '../components/Matches';
import { Layout, Menu, Breadcrumb, Card, Avatar, List, Statistic } from 'antd';
import {
  ArrowUpOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Leagues from '../components/Leagues';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { SubMenu } = Menu;

export default function Home() {
  const [leagues, setLeagues] = useState(['Inglaterra - Premier League']);
  const [data, setData] = useState([]);

  const onSelect = (e) => {
    console.log(e);
    setLeagues(e);
  };

  const loadData = async () => {
    const date = new Date().toISOString().split('T')[0];

    const request = {
      date,
      sports: ['FOOT', 'TENN', 'CYCL'],
    };
    const res = await fetch('/api/sports', {
      method: 'POST',
      body: JSON.stringify(request),
    });

    const { data } = await res.json();
    const newData = data.reduce((acc, sport) => {
      return [...acc, ...sport];
    }, []);

    const newData2 = newData.map((group) => {
      const newEvents = group.events.map((event) => {
        const parts = event.title.split('-');
        const partCero = parts[0].split(',');
        return {
          ...event,
          sport: partCero[0],
          region: partCero[1],
          country: parts[1],
          league: parts[2],
        };
      });
      return {
        time: group.time,
        events: newEvents,
      };
    });

    console.log(newData2);
    setData(newData2.sort((a, b) => (a.time > b.time ? 1 : -1)));
  };

  useEffect(() => {
    console.log('efecto');
    loadData();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header style={{ padding: 0 }}>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
            <Menu.Item key='1'>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link href='/today'>
                <a>today</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='3'>nav 3</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {data.length > 0 &&
            data.map((m, i) => (
              <div key={i}>
                <Breadcrumb>
                  <Breadcrumb.Item>{m.time}</Breadcrumb.Item>
                </Breadcrumb>
                <List
                  grid={{ gutter: 16, column: 3 }}
                  dataSource={m.events}
                  renderItem={(event) => (
                    <List.Item>
                      <Card size='small' style={{ marginTop: 16 }}>
                        <List.Item.Meta
                          avatar={
                            event.sport == 'Futbol'
                              ? '⚽'
                              : event.sport == 'Tenis'
                              ? '🥎'
                              : '🚴🏼‍♂️'
                          }
                          title={event.sport}
                          description={event.country + ' - ' + event.league}
                        />
                        <Meta
                          title={
                            <a
                              href={'https://apuestas.wplay.co' + event.link}
                              target='_blank'
                            >
                              {event.match}
                            </a>
                          }
                          // description={event.title}
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            ))}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
