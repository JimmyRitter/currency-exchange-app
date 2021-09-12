import React from 'react';
import { WalletContainer, ExchangeContainer } from "./index";
import { ExchangeService, LatestRates } from "../api-client";
import { ExchangeData, Rate } from "../shared";

interface IState {
  rates: Rate[];
  exchangeData?: ExchangeData;
  error: string;
}

class MainContainer extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      rates: [],
      exchangeData: undefined,
      error: '',
    }
    this.castRatesAPIObjectToList = this.castRatesAPIObjectToList.bind(this);
    this.onSubmitExchange = this.onSubmitExchange.bind(this);
    this.onError = this.onError.bind(this);
  }

  /**
   * Lifecycle method that runs after the component has been rendered to the DOM
   */
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

  /**
   * Convert the Rates API Object to a list to be easier to work with
   * @param list
   */
  castRatesAPIObjectToList = (list: LatestRates) => {
    const ratesList: Rate[] = [];

    Object.entries(list.rates).forEach((item) => {
      ratesList.push({ symbol: item[0], price: item[1] });
    });

    return ratesList;
  }

  /**
   * Handle the exchange values form submit
   * @param formData
   */
  onSubmitExchange = (formData: ExchangeData) => {
    this.setState({
      ...this.state,
      error: '',
      exchangeData: formData
    })
  }

  /**
   * Display an error message if there are no suficient funds
   * @param insuficientFunds 
   */
  onError = (insuficientFunds: boolean) => {
    if (insuficientFunds) {
      this.setState({
        ...this.state,
        error: 'You do not have enough funds to perform this operation.'
      });
    }
  }

  render() {
    return (
      this.state.rates.length > 0 && (
        <>
          <WalletContainer
            rates={this.state.rates}
            exchangeValues={this.state.exchangeData!}
            insuficientFunds={this.onError}
          />
          <ExchangeContainer
            rates={this.state.rates}
            submitExchange={this.onSubmitExchange}
            error={this.state.error}
          />
        </>
      )
    );
  }
}

export default MainContainer;
