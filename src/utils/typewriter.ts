import { TypewriterClass } from 'typewriter-effect';

export const initialText = (typewriter: TypewriterClass) => {
  const hostname = document.location.hostname;

  typewriter
    .changeDelay(60)
    .typeString(`<h1>${hostname}</h1>`)
    .start();
}
