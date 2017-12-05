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
    className: PropTypes.string,
  };

  static defaultProps = {
    onClick: () => false,
    isSelected: false,
    children: null,
    tabIndex: 0,
    className: null,
  };

  render() {
    return (
      <SwitcherOptionStyled
        role="radio"
        tabIndex={this.props.tabIndex}
        aria-checked={this.props.isSelected}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        className={this.props.className}
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