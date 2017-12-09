import styled from 'styled-components';
import icon from './ripple.svg';

export const ImageContainer = styled.div`
  background-image: url(${icon});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  animation: fadein 500ms;
  
  width: 100%;
  height: 100%;
  
  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;
