import {useState} from 'react';
import axios from 'axios';

export const useLinksYT = () => {
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);

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

  const downloadMusic = urls => {
    setDownloading(true);
    return axios
      .post('/api/download_yt', {urls})
      .then(res => {
        setDownloading(false);
        return res.data.data;
      })
      .catch(err => {
        console.log(err);
        setDownloading(false);
      });
  };
  return {
    isLoading: loading,
    downloading,
    getLinks,
    downloadMusic,
  };
};
