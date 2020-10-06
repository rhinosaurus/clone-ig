'use strict';

(async () => {
  const userVideo = document.querySelector('#local');
  let userStream;

  const handleUserStream = media => {
    userStream = media;
    userVideo.srcObject = media;
  };

  try  {
    const stream = await navigator.mediaDevices.getUserMedia({
     video: {
        frameRate: { min: 30, max: 60 }
    } 
    });
    handleUserStream(stream);
  } catch(exc) {
    console.log(exc);
  }
})();
