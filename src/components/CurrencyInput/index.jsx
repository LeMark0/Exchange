import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { CurrencyInputStyled } from './styled';

export default class CurrencyInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    thousandSeparator: PropTypes.string,
    decimalSeparator: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    decimalScale: PropTypes.number,
    className: PropTypes.string,
    isNumericString: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => false,
    thousandSeparator: ' ',
    decimalSeparator: '.',
    decimalScale: 2,
    className: null,
    isNumericString: true,
    value: '',
  };

  render() {
    const { value } = this.props;
    const stringValue = (!value) ? '0' : value;
    const props = {
      ...this.props,
      value: stringValue,
    };

    return (
      <CurrencyInputStyled
        {...props}
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
