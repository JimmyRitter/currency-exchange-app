import React from 'react';
import { WalletItem } from "./Wallet.types";

interface IProps {
  walletItem: WalletItem;
}

const WalletSingle = ({ walletItem }: IProps) => {
  return (
    <>
      {walletItem.currency}
      {" "}
      {walletItem.amount}
      <br/>
    </>
  );
}

export default WalletSingle;
