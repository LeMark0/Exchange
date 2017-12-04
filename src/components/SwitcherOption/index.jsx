import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SwitcherOptionStyled } from './styled';

export default class SwitcherOption extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    children: PropTypes.node,
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    onClick: () => false,
    isSelected: false,
    children: null,
    tabIndex: 0,
  };

  render() {
    return (
      <SwitcherOptionStyled
        role="radio"
        tabIndex={this.props.tabIndex}
        aria-checked={this.props.isSelected}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
      >
        {this.props.children}
      </SwitcherOptionStyled>
    );
  }

  handleClick = () => {
    const { value, onClick } = this.props;
    onClick(value);
  }
};