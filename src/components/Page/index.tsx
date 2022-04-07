import React from 'react';
import { Container } from './styles';

// eslint-disable-next-line react/function-component-definition
const Page: React.FC = () => {
  return (
    <Container>
      <div>
        <h1 className="center">지갑</h1>
        <input type="text" name="account" id="account" value="0000000000" disabled />
        <button type="submit">지갑 가져오기</button>
      </div>
      <div>
        <h1 className="center">잔액</h1>
        <input type="text" name="balance" id="balance" value="0000000000" disabled />
        <button type="submit">잔액 새로고침</button>
      </div>
      <div>
        <h1 className="center">보내기</h1>
        <input type="text" name="target-account" id="target-account" value="0x40F12096f1aD66713C2fF56a04E4E3245DF775EA" disabled />
        <button type="submit">보내기</button>
      </div>
    </Container>
  );
};

export default Page;
