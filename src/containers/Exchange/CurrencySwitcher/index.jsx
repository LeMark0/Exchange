import React from 'react';
import PropTypes from 'prop-types';

import currencyList from 'constants/currencyList';
import { SwitcherStyled, SwitcherOptionStyled } from './styled';

export default function CurrencySwitcher(props) {
  const { value, onChange } = props;

  return (
    <SwitcherStyled value={value} onChange={onChange}>
      {
        Object.values(currencyList).map((currencyInfo) => (
          <SwitcherOptionStyled
            value={currencyInfo.code}
            key={currencyInfo.code}
          >
            {currencyInfo.code}
          </SwitcherOptionStyled>
        ))
      }
    </SwitcherStyled>
  );
}

CurrencySwitcher.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

CurrencySwitcher.defaultProps = {
  value: '',
  onChange: () => false,
};
