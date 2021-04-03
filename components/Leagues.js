import { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

const Leagues = ({ onChange }) => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:3000/api/league');
    const { leagues } = await res.json();
    setLoading(false);
    setLeagues(leagues);
  };

  useEffect(() => {
    // loadData();
  }, []);

  const children = [];
  console.log(leagues);
  leagues.forEach((l, i) => {
    children.push(
      <Option key={i.toString(36) + i} value={l.value} label={l.label}>
        {l.value}
      </Option>
    );
  });

  return (
    <>
      <Select
        mode='multiple'
        allowClear
        style={{ width: '100%' }}
        placeholder='Please select'
        defaultValue={['Inglaterra - Premier League']}
        onChange={onChange}
      >
        {children}
      </Select>
    </>
  );
};

export default Leagues;
