import {useState} from 'react';
import axios from 'axios';

export const useLinksYT = () => {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLinks = url => {
    setLoading(true);
    return axios
      .post('/api/links_yt', {url})
      .then(res => {
        setLoading(false);
        return res.data.data;
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        return [];
      });
  };
  return {
    isLoading: loading,
    getLinks,
  };
};
