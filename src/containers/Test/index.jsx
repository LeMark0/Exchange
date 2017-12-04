import React from 'react';

import currencyList from 'constants/currencyList';

import Button from 'components/Button';
import Currency from 'components/Currency';
import CurrencyInput from 'components/CurrencyInput';
import Loader from 'components/Loader';
import Switcher from 'components/Switcher';
import SwitcherOption from 'components/SwitcherOption';

export default function Test() {
  return (
    <div>
      <Button>Button</Button>
      <Button isDisabled>Button disabled</Button>
      <Currency value={100500} currencyCode={currencyList.USD.code} />
      <CurrencyInput
        value={100500}
        onChange={(value) => console.log(value)}
      />
      <div style={{ width: '100px', height: '100px' }} >
        <Loader />
      </div>
      <Switcher>
        <SwitcherOption value={currencyList.USD.code}>
          USD
        </SwitcherOption>
        <SwitcherOption value={currencyList.EUR.code}>
          EUR
        </SwitcherOption>
        <SwitcherOption value={currencyList.GBP.code}>
          GBP
        </SwitcherOption>
      </Switcher>
      <Switcher orientation="vertical">
        <SwitcherOption value={currencyList.USD.code}>
          USD
        </SwitcherOption>
        <SwitcherOption value={currencyList.EUR.code}>
          EUR
        </SwitcherOption>
        <SwitcherOption value={currencyList.GBP.code}>
          GBP
        </SwitcherOption>
      </Switcher>
    </div>
  );
}
