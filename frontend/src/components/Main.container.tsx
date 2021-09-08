import React from 'react';
import { WalletContainer, ExchangeContainer } from "./index";
import { ExchangeService, LatestRates } from "../api-client";
import { Rate } from "../shared";

interface IState {
  rates: Rate[];
}

class MainContainer extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      rates: []
    }
  }

  castRatesAPIObjectToList = (list: LatestRates) => {
    const ratesList: Rate[] = [];

    Object.entries(list.rates).forEach((item) => {
      ratesList.push({ symbol: item[0], price: item[1] });
    });

    return ratesList;
  }

  componentDidMount() {
    ExchangeService.getLatestRates()
      .then((response) => {
        const rates = this.castRatesAPIObjectToList(response.data);
        this.setState({ rates: rates });
      })
      .catch((err) => {
        console.error('error', err);
      });
  }

  render() {
    return (
      <>
        {this.state.rates.length > 0 && (
          <>
            <WalletContainer rates={this.state.rates} />
            <ExchangeContainer rates={this.state.rates} />
          </>
        )}
      </>
    );
  }

}

export default MainContainer;
