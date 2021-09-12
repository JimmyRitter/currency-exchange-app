import React from 'react';
import { WalletItem } from "./Wallet.types";
import { WalletItemWrapper } from '../StyledComponents'

interface IProps {
  walletItem: WalletItem;
}

const WalletSingle = ({ walletItem }: IProps) => {

  /**
   * Format the currency amount based on the navigator language
   * @param currency e.g: "EUR"
   * @param amount e.g: 150
   * @returns e.g: € 150,00
   */
  const formatCurrency = (currency: string, amount: number): string => {
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  return (
    <WalletItemWrapper>
      <span>{walletItem.currency}</span>
      <span>{formatCurrency(walletItem.currency, walletItem.amount)}</span>
    </WalletItemWrapper>
  );
}

export default WalletSingle;
