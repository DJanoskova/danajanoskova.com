import React from 'react';
import Typewriter from 'typewriter-effect';

const Loading = () => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .changeDelay(60)
          .typeString('<p>Initalized loading...</p>')
          .pauseFor(2500)
          .deleteAll()
      }}
    />
  )
}

export default Loading;
