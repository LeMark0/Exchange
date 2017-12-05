import React, { Component } from 'react';
import { connect } from 'react-redux';
// import store from 'reduxConfig/store';
// import Actions from 'reduxConfig/actions/`Exchange`Actions';

import CurrencySwitcher from './CurrencySwitcher';
import { Container } from './styled';

class Exchange extends Component {

  static propTypes = {};

  static defaultProps = {};

  componentWillReceiveProps(props) {

  };

  componentWillMount() {

  };

  render() {
    return (
      <Container>
        <CurrencySwitcher />
      </Container>
    );
  };
};

const mapStateToProps = function (state) {
  return {
    // REPLACE
    // data: state.$ComponentName.data,
  };
};

export default connect(mapStateToProps)(Exchange);