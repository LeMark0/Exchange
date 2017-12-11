import { injectGlobal } from 'styled-components';
import { mainBackgroundDark, defaultText } from './color';

export default injectGlobal`
  html,
  root,
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: ${defaultText};
    margin: 0;
    height: 100%;
  }
  body {
    background: ${mainBackgroundDark};
  }
  #app {
    height: 100%;
  }
`;
