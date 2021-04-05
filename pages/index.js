import { useEffect, useState } from 'react';
import Link from 'next/link';
import 'antd/dist/antd.css';
import Matches from '../components/Matches';
import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Avatar,
  List,
  Statistic,
  Skeleton,
  Select,
} from 'antd';
import {
  ArrowUpOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Leagues from '../components/Leagues';
import { fetchLatestMatches } from '../firebase/client';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const { SubMenu } = Menu;
const { Option } = Select;

export default function Home() {
  const [leagues, setLeagues] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [data, setData] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelect = (e) => {
    console.log(e);
    setSelectedLeagues(e);
    const newData = data.reduce((acc, group) => {
      const time = group.time;
      const events = group.events.filter((event) =>
        selectedLeagues.includes(event.title)
      );

      acc.push({
        time,
        events,
      });
      return acc;
    }, []);
    setMatches(newData.filter((m) => m.events.length > 0));
  };

  const formatDate = (d = new Date()) => {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  const loadData = () => {
    fetchLatestMatches().then((data) => {
      debugger;
      console.log(data);
      // const newData = data.reduce((acc, sport) => {
      //   return [...acc, ...sport];
      // }, []);

      const tmpLeagues = [];

      const newData2 = data.map((group) => {
        const newEvents = group.events.map((event) => {
          const parts = event.title.split('-');
          const partCero = parts[0].split(',');
          tmpLeagues.push(event.title);
          // tmpLeagues.push(parts[2].trimEnd().trimStart());
          return {
            ...event,
            match: event.match.split(/st[0-9]{1,3}/)[0],
            sport: partCero[0],
            region: partCero[1],
            country: parts[1],
            league: parts[2].trimEnd().trimStart(),
          };
        });
        return {
          time: group.time,
          events: newEvents,
        };
      });

      console.log(newData2);
      const uniqueLeagues = [...new Set(tmpLeagues)].sort((a, b) =>
        a > b ? 1 : -1
      );
      setLeagues(uniqueLeagues);
      setData(newData2.sort((a, b) => (a.time > b.time ? 1 : -1)));
      setMatches(newData2.sort((a, b) => (a.time > b.time ? 1 : -1)));
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log('efecto');
    setLoading(true);
    loadData();
  }, []);

  const children = [];
  leagues.forEach((l, i) => {
    children.push(
      <Option key={i.toString(36) + i} value={l} label={l}>
        {l}
      </Option>
    );
  });

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
          {loading && <Skeleton />}
          {!loading && (
            <Select
              mode='multiple'
              allowClear
              style={{ width: '100%' }}
              placeholder='Please select'
              defaultValue={[
                'Futbol,Italia -Serie A -',
                'Futbol,Reino Unido -Inglaterra - Premier League -',
                'Futbol,España -La Liga -',
                'Futbol,Américas -Argentina - Copa de la Liga Profesional -',
                'Futbol,Américas -Colombia - Primera A -',
              ]}
              onChange={onSelect}
            >
              {children}
            </Select>
          )}
          {data.length > 0 &&
            matches.map((m, i) => (
              <div key={i}>
                <Breadcrumb>
                  <Breadcrumb.Item>{m.time}</Breadcrumb.Item>
                </Breadcrumb>
                <List
                  loading={loading}
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
