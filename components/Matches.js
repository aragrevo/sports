import { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {
  Skeleton,
  Row,
  Col,
  Card,
  Avatar,
  List,
  Statistic,
  Select,
} from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Option } = Select;

const Matches = ({ leagues }) => {
  const [matches, setMatches] = useState([]);
  const [allMatches, setAllMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  let count = 0;

  const loadData = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3000/api/hello', {
      method: 'POST',
      body: JSON.stringify(leagues),
    });

    const { data } = await res.json();

    console.log(count, data);
    if (data.length == 0 && count < 3) {
      count++;
      loadData();
      return;
    }
    setLoading(false);
    setMatches(data);
    setAllMatches(data);
    // getDates();
  };

  useEffect(() => {
    console.log('efecto');
    loadData();
  }, [leagues]);

  if (loading) return <Skeleton />;

  const getDates = () => {
    const dates = matches.map((m) => m.date);
    console.log({ dates });
    let unique = [...new Set(dates)];
    setDates(unique);
  };

  const handleChange = (e) => {
    console.log(e);
    const filters =
      e.length == 0 ? allMatches : allMatches.filter((x) => e.includes(x.date));
    setMatches(filters);
  };

  return (
    <>
      <Select
        mode='multiple'
        allowClear
        style={{ width: '100%' }}
        placeholder='Please select'
        defaultValue={[]}
        onChange={handleChange}
      >
        {dates.map((x, i) => (
          <Option key={i.toString(36) + x} value={x}>
            {x}
          </Option>
        ))}
      </Select>

      {!loading &&
        matches.map((x, i) => (
          <Card style={{ marginTop: 16 }} loading={loading} key={i}>
            <Meta
              avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
              title={x.local + ' - ' + x.visit}
              description={x.time}
            />
            <List
              itemLayout='horizontal'
              dataSource={x.odds}
              renderItem={(item) => (
                <List.Item>
                  <Statistic
                    title={
                      <a
                        href={'https://apuestas.wplay.co' + x.link}
                        target='_blank'
                      >
                        {item.name}
                      </a>
                    }
                    value={item.odd}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix='%'
                  />
                </List.Item>
              )}
            />
          </Card>
        ))}
    </>
  );
};

export default Matches;
