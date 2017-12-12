import React from 'react';
import PropTypes from 'prop-types';

import { SwitcherStyled } from './styled';

function getInitialValue(propValue, children) {
  if (propValue) {
    return propValue;
  }

  if (children.length && children[0].props) {
    return children[0].props.value;
  }

  return propValue;
}

export default class Switcher extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),
    onChange: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node),
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    className: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    onChange: () => false,
    children: null,
    orientation: 'horizontal',
    className: null,
  };

  constructor(props) {
    super(props);
    const { value, children } = props;

    this.state = {
      value: getInitialValue(value, children),
    };
  }

  render() {
    const { children, orientation, className } = this.props;
    const { value } = this.state;

    const childrenList = children.map((child, key) =>
      React.cloneElement(child, {
        tabIndex: key,
        key: child.props.value,
        onClick: this.onChange,
        isSelected: value === child.props.value,
      }));

    return (
      <SwitcherStyled
        role="radioGroup"
        orientation={orientation}
        className={className}
      >
        {childrenList}
      </SwitcherStyled>
    );
  }

  onChange = (value) => {
    this.setState({ value });

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
}
