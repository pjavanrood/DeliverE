import ReactPlayer from 'react-player';
import React, { useRef } from 'react';
const VIDEO_PATH = '../assets/Data_Grid.mp4';
function PlayerComponent() {
   const playerRef = useRef(null);
   return (
      <div className='bg_video'>
        <ReactPlayer ref={playerRef} url={VIDEO_PATH} controls={true} />
      </div>
   )
};
export default PlayerComponent;