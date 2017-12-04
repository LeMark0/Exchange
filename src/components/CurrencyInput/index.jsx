import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CurrencyInputStyled } from './styled';

export default class CurrencyInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    thousandSeparator: PropTypes.string,
    decimalSeparator: PropTypes.string,
    decimalScale: PropTypes.number,
  };

  static defaultProps = {
    onChange: () => false,
    thousandSeparator: ' ',
    decimalSeparator: '.',
    decimalScale: 2,
  };

  render() {
    return (
      <CurrencyInputStyled
        {...this.props}
        onChange={this.onChange}
      />
    );
  }

  onChange = (e) => {
    const { onChange } = this.props;
    const { value } = e.target;

    if (onChange) {
      onChange(value);
    }
  }
}
