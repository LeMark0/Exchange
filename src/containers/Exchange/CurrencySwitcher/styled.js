import styled from 'styled-components';

import Switcher from 'components/Switcher';
import SwitcherOption from 'components/SwitcherOption';

export const SwitcherStyled = styled(Switcher)`
  justify-content: center;
`;

export const SwitcherOptionStyled = styled(SwitcherOption)`
  border: 1px solid #466088;
  padding: 2px;
  font-size: 10px;
  display: table-cell;
  color: white;
  
  background: ${(props) => (props.isSelected ? 'rgba(255, 255, 255, 0.45)' : 'initial')};
`;
