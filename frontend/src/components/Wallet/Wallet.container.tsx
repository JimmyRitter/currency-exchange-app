import React from 'react';
import { WalletItem, WalletSingle } from "./index";
import { Rate } from "../../shared";

interface IState {
  currentWallet: WalletItem[];
}

interface IProps {
  rates: Rate[];
}

class WalletContainer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    // TODO - Make this dynamic (?) - Maybe won't be possible due to the default values
    const initialWalletState: WalletItem[] = [{
      currency: "USD",
      amount: 200,
    }, {
      currency: "EUR",
      amount: 150,
    }, {
      currency: "GBP",
      amount: 10,
    }];

    this.state = {
      currentWallet: initialWalletState,
    };
  }


  render() {
    return (
      <>
        <h2>Your wallet!</h2>
        {this.state.currentWallet.map((item) => (
           <WalletSingle key={item.currency} walletItem={item} />
        ))}
      </>
    );
  }
}

export default WalletContainer;
