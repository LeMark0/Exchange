import styled from 'styled-components';
import CurrencyInput from 'components/CurrencyInput';
import Button from 'components/Button';

export const Container = styled.div`
  justify-content: center;
  display: flex;
  // margin: 25px auto;
`;

export const TopContainer = Container.extend`
  align-items: flex-end;
  height: 30%;
  min-height: 150px;
`;

export const BottomContainer = Container.extend`
  background-color: #007bd0;
  align-items: flex-start;
  height: 70%;
`;

export const ExchangeContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: #fff;
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
  color: ${(props) => (props.ispositive ? '#41e887' : '#ffffff')};
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
  color: ${(props) => (props.error ? '#ff8888' : '#ffffff')};

  span {
    margin-right: 5px;
  }
`;

export const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #1D95E7;

  margin: 0 auto;
`;
