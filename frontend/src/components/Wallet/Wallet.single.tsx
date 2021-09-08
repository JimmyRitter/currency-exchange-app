import React from 'react';
import { WalletItem } from "./Wallet.types";

interface IProps {
  walletItem: WalletItem;
}

class WalletSingle extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {this.props.walletItem.currency}
        {this.props.walletItem.amount}
        <br />
      </>
    );
  }
}

export default WalletSingle;
