/* eslint-disable no-console */
import { ExternalProvider, JsonRpcFetchFunc } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Contract, ethers } from 'ethers';
import React, { useState } from 'react';
import { injectedConnector } from '../../connector';
import { ttkabi } from '../../sol/ttkabi';
// import Web3 from 'web3';
import { Container } from './styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: (Window & typeof globalThis) | any;

// eslint-disable-next-line react/function-component-definition
const Page: React.FC = () => {
  const { account, chainId, activate } = useWeb3React();
  const [active, setActive] = useState<string>('none');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [targetAccount, setTargetAccount] = useState<string>(
    `${process.env.REACT_APP_TARGETADDRESS}`
  );
  const [metaProvider, setMetaProvider] = useState<
    ExternalProvider | JsonRpcFetchFunc
  >({});
  const [ttkToken, setTtkToken] = useState<Contract>();
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
    if (typeof window.ethereum !== 'undefined') {
      // MetaMask is installed
      window.ethereum.request('eth_requestAccounts');
      setMetaProvider(window.ethereum);
    } else {
      throw new Error('No web3 provider detected');
    }
    activate(injectedConnector);
  };
  const contractTTK = async () => {
    console.log('[contractTTK]=======================================');
    try {
      const conProvider = new ethers.providers.Web3Provider(metaProvider);
      const signer = await conProvider.getSigner();
      const ttkTokenContract = new ethers.Contract(
        `${process.env.REACT_APP_CONTRACT}`,
        ttkabi,
        signer
      );
      setTtkToken(ttkTokenContract);
      setActive('Connection success');
    } catch {
      throw new Error(
        '[contractTTK] MetaMask Wallet and TTK Contract Connection Failure'
      );
    }
  };
  const accountBalance = async () => {
    console.log('[accountBalance]=======================================');
    try {
      const balnceOfttkToken = await ttkToken?.balanceOf(account);
      const symbolttkToken = await ttkToken?.symbol();
      const ttkBalance = balnceOfttkToken.toNumber() / 100000;
      setBalacne(ttkBalance);
      setSymbol(symbolttkToken);
    } catch (err) {
      throw new Error('[accountBalance] no connection');
    }
  };

  const handleSendTransaction = async () => {
    console.log(
      '[handleSendTransaction]======================================='
    );
    try {
      await ttkToken?.transfer(targetAccount, sendTokenBalance * 10 ** 5);
    } catch (err) {
      throw new Error('[handleSendTransaction] transaction Error');
    }
  };

  return (
    <Container>
      <div>
        <h1 className="center">??????</h1>
        <p>Account : {account}</p>
        <p>ChainId : {chainId}</p>
        <p>active : {active}</p>
        <button type="submit" onClick={activateWallet}>
          ?????? ????????????
        </button>
        <button type="submit" onClick={contractTTK}>
          ???????????? ????????????
        </button>
      </div>
      <div>
        <h1 className="center">??????</h1>
        <p>
          balance : {balance}
          {symbol}
          {}
        </p>
        <button type="submit" onClick={accountBalance}>
          ?????? ????????????
        </button>
      </div>
      <div>
        <h1 className="center">?????????</h1>
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
          ?????????
        </button>
      </div>
    </Container>
  );
};

export default Page;
