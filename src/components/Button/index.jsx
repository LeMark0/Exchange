import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyled } from './styled';

const Button = (props) => (
  <ButtonStyled
    disabled={props.isDisabled}
    onClick={props.onClick}
  >
    {props.children}
  </ButtonStyled>
);

Button.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  onClick: () => false,
  isDisabled: false,
  children: null,
};

export default Button;
