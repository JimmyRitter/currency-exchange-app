import React from 'react';
import { WalletItem, WalletSingle } from "./index";
import { Rate, ExchangeData } from "../../shared";

interface IState {
  currentWallet: WalletItem[];
}

interface IProps {
  rates: Rate[];
  exchangeValues: ExchangeData
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

  componentDidUpdate = (prevProps: IProps) => {
    // ensure that the exchange will happen just once
    if (prevProps.exchangeValues !== this.props.exchangeValues) {
      if (!this.validateSufficientFunds()) {
        console.log('display "insufficient funds" error');
        return;
      }
      this.exchangeCurrencies();
    }
  }

  exchangeCurrencies = () => {
    // get the currency and amounts to be added and subtracted
    const { currency: sourceCurrency, amount: sourceAmount } = this.props.exchangeValues.source;
    const { currency: targetCurrency, amount: targetAmount } = this.props.exchangeValues.target;

    // get the indexes of the items within the wallet list
    const sourceItemIndex = this.state.currentWallet.findIndex((x) => x.currency === sourceCurrency);
    const targetItemIndex = this.state.currentWallet.findIndex((x) => x.currency === targetCurrency);

    // update the currency quantities on the wallet
    const walletItems = this.state.currentWallet;
    walletItems[sourceItemIndex].amount = +(walletItems[sourceItemIndex].amount - sourceAmount).toFixed(2);
    walletItems[targetItemIndex].amount = +(walletItems[targetItemIndex].amount + targetAmount).toFixed(2);

    this.setState({
      ...this.state,
      currentWallet: walletItems
    });
  }

  validateSufficientFunds = () => {
    const { currency, amount } = this.props.exchangeValues.source;
    const walletItem = this.state.currentWallet.find((x) => x.currency === currency)!;
    return ((walletItem.amount - amount) >= 0);
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
