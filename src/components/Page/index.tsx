/* eslint-disable no-console */
import { useWeb3React } from '@web3-react/core';
import React, { useState } from 'react';
// import Web3 from 'web3';
import { Container } from './styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: (Window & typeof globalThis) | any;

// eslint-disable-next-line react/function-component-definition
const Page: React.FC = () => {
  const { account, chainId, active } = useWeb3React();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [targetAccount, setTargetAccount] = useState<string>(
    `${process.env.REACT_APP_TARGETADDRESS}`
  );

  const [balance, setBalacne] = useState<number>(0);
  const [symbol, setSymbol] = useState<string>(' -');
  const [sendTokenBalance, setSendTokenBalance] = useState<number>(0);

  const targetAccountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTargetAccount(event.target.value);
  };
  const sendTokenBalanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSendTokenBalance(Number(event.target.value));
  };

  const activateWallet = async () => {
    console.log('[activateWallet]=======================================');
  };
  const contractTTK = async () => {
    console.log('[contractTTK]=======================================');
  };
  const accountBalance = async () => {
    console.log('[accountBalance]=======================================');
  };

  const handleSendTransaction = async () => {
    console.log(
      '[handleSendTransaction]======================================='
    );
  };

  return (
    <Container>
      <div>
        <h1 className="center">지갑</h1>
        <p>Account : {account}</p>
        <p>ChainId : {chainId}</p>
        <p>active : {active}</p>
        <button type="submit" onClick={activateWallet}>
          지갑 가져오기
        </button>
        <button type="submit" onClick={contractTTK}>
          컨트렉트 연결하기
        </button>
      </div>
      <div>
        <h1 className="center">잔액</h1>
        <p>
          balance : {balance}
          {symbol}
          {}
        </p>
        <button type="submit" onClick={accountBalance}>
          잔액 새로고침
        </button>
      </div>
      <div>
        <h1 className="center">보내기</h1>
        <input
          type="text"
          name="target-account"
          id="target-account"
          value={targetAccount}
          onChange={targetAccountChange}
        />
        <input
          type="text"
          name="target-account"
          id="target-account"
          value={sendTokenBalance}
          onChange={sendTokenBalanceChange}
        />
        <button type="submit" onClick={handleSendTransaction}>
          보내기
        </button>
      </div>
    </Container>
  );
};

export default Page;
