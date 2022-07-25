import React from 'react';
import {Image} from 'antd';

const YoutubeEmbed = ({embedId}) => {
  const id = embedId.split('=')[1].split('&')[0];
  return <Image width={200} src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} preview={false} />;
};

export default YoutubeEmbed;
