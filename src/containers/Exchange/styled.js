import styled from 'styled-components';
import {
  mainBackgroundBright,
  errorTextDarkBg,
  errorTextLightBg,
  positiveText,
  defaultWhite,
} from 'styles/color';
import CurrencyInput from 'components/CurrencyInput';
import Button from 'components/Button';

export const Container = styled.div`
  margin: 0 auto;
`;

export const TopContainer = Container.extend`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 30%;
  min-height: 150px;
  background-color: ${mainBackgroundBright};
`;

export const BottomContainer = Container.extend`
  height: 70%;
`;

export const FieldContainer = styled.div`
  width: 30vw;
  min-width: 300px;
  margin: 0 auto;
`;

export const ExchangeContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h2`
  color: ${defaultWhite};
  text-align: center;
`;

export const Symbol = styled.div`
  line-height: 50px;
  width: 50px;
  height: 50px;
  font-size: 24px;
  color: white;
  text-align: left;
`;

export const CurrencyInputStyled = styled(CurrencyInput)`
  border-bottom: none;
  color: ${(props) => (props.ispositive ? positiveText : defaultWhite)};
`;

export const CurrencyContainer = styled.div`
  justify-content: space-between;
  display: flex;
`;

export const ButtonStyled = styled(Button)`
  margin: 20px auto;
`;


export const Balance = styled.div`
  display: flex;
  text-align: left;
  width: 100%;
  font-size: 12px;
  color: ${(props) => (props.error ? errorTextLightBg : defaultWhite)};

  span {
    margin-right: 5px;
  }
`;

export const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid ${mainBackgroundBright};

  margin: 0 auto;
`;

export const ErrorItem = styled.li`
  color: ${errorTextDarkBg};
  text-align: left;
  font-size: 14px;
`;

export const ErrorList = styled.ul`
  padding-left: 10px;
`;
