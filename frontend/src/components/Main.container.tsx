import React from 'react';
import { WalletContainer, ExchangeContainer } from "./index";
import { ExchangeService, LatestRates } from "../api-client";
import { ExchangeData, Rate } from "../shared";

interface IState {
  rates: Rate[];
  exchangeData?: ExchangeData;
}

class MainContainer extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      rates: [],
      exchangeData: undefined,
    }
  }

  castRatesAPIObjectToList = (list: LatestRates) => {
    const ratesList: Rate[] = [];

    Object.entries(list.rates).forEach((item) => {
      ratesList.push({ symbol: item[0], price: item[1] });
    });

    return ratesList;
  }

  componentDidMount = () => {
    ExchangeService.getLatestRates()
      .then((response) => {
        const rates = this.castRatesAPIObjectToList(response.data);
        this.setState({ rates: rates });
      })
      .catch((err) => {
        console.error('error', err);
      });
  }

  onSubmitExchange = (formData: ExchangeData) => {
    this.setState({
      ...this.state,
      exchangeData: formData
    })
  }
  //
  // onUpdateWalletValues = (sourceAmount: number, targetAmount: number) => {
  //
  // }

  render() {
    return (
      <>
        {this.state.rates.length > 0 && (
          <>
            <WalletContainer rates={this.state.rates} exchangeValues={this.state.exchangeData!} />
            <ExchangeContainer rates={this.state.rates} submitExchange={this.onSubmitExchange} />
          </>
        )}
      </>
    );
  }

}

export default MainContainer;
