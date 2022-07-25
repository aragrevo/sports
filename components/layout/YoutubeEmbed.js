import React from 'react';
import {Image} from 'antd';

const YoutubeEmbed = ({embedId}) => {
  const id = embedId.split('=')[1].split('&')[0];
  return (
    <div className='video-responsive'>
      {/* <iframe
      width='150'
      height='200'
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder='0'
      title='Embedded youtube'
    /> */}
      <Image width={200} src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} preview={false} />
    </div>
  );
};

export default YoutubeEmbed;
