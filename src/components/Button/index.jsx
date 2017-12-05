import React from 'react';
import PropTypes from 'prop-types';

import { ButtonStyled } from './styled';

const Button = (props) => (
  <ButtonStyled
    disabled={props.isDisabled}
    onClick={props.onClick}
    className={props.className}
  >
    {props.children}
  </ButtonStyled>
);

Button.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => false,
  isDisabled: false,
  children: null,
  className: null,
};

export default Button;
