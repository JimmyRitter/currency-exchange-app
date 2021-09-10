import React from 'react';
import { WalletItem } from "./Wallet.types";
import { WalletItemWrapper } from '../StyledComponents'

interface IProps {
  walletItem: WalletItem;
}

const WalletSingle = ({ walletItem }: IProps) => {
  return (
    <WalletItemWrapper>
      <span>{walletItem.currency}</span>
      <span>{walletItem.amount}</span>
    </WalletItemWrapper>
  );
}

export default WalletSingle;
