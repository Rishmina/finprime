import React from 'react';
import { useParams } from 'react-router-dom';
import { Services } from '../Services';
import { useEffect, useState } from 'react';

const Servicesection3 = () => {
  const { servicetitle, subServicetitle } = useParams();
  const service = Services.find((s) => s.title.replace(/\s+/g, '-') === servicetitle);
  const subService = service?.subtitles.find((sub) => sub.keyword.replace(/\s+/g, '-') === subServicetitle);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (subService?.video) {
      setVideoLoaded(true);
    }
  }, [subService]);

  if (!service || !subService || !subService.video) {
    return null; // Don't render anything if there's no video
  }

  return (
    <div className='relative w-full mx-auto my-16' style={{ maxWidth: '1200px' }}>
      {videoLoaded && (
        <video
          key={subService.video}
          className="w-full h-auto rounded-lg shadow-lg"
          controls
          autoPlay
          muted
          loop
        >
          <source src={subService.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Servicesection3;
