import React from 'react';
import { ExchangeData, Rate } from "../../shared";

interface IProps {
  rates: Rate[];
  submitExchange: (formData: ExchangeData) => void;
}

interface IState {
  source: {
    inputValue: string,
    rate: Rate,
  };
  target: {
    rate: Rate,
  };
  conversionRate: number;
  totalExchange: number
}

class ExchangeContainer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    const sourceRate = this.props.rates.find((x) => x.symbol === "EUR") || this.props.rates[0]; // default Euro or first item
    const targetRate = this.props.rates.find((x) => x.symbol === "USD") || this.props.rates[1]; // default Dollar or second item

    this.state = {
      source: {
        inputValue: '',
        rate: {
          symbol: sourceRate.symbol,
          price: sourceRate.price,
        },
      },
      target: {
        rate: {
          symbol: targetRate.symbol,
          price: targetRate.price,
        },
      },
      conversionRate: 0,
      totalExchange: 0
    }

    this.handleChangeSourceCurrency = this.handleChangeSourceCurrency.bind(this);
    this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
    this.validateEnteredValue = this.validateEnteredValue.bind(this);
    this.onSubmitExchangeForm = this.onSubmitExchangeForm.bind(this);
  }

  componentDidMount() {
    this.updateConversionRateAndExchangeValue();
  }

  handleChangeSourceCurrency = (event: any): void => {
    const selectedCurrency = event.target.value;
    const rateRef = this.props.rates.find((e) => e.symbol === selectedCurrency)!;
    this.setState({
      ...this.state,
      source: {
        ...this.state.source,
        rate: rateRef
      }
    }, () => this.updateConversionRateAndExchangeValue());
  }

  handleChangeTargetCurrency = (event: any): void => {
    const selectedCurrency = event.target.value;
    const rateRef = this.props.rates.find((e) => e.symbol === selectedCurrency)!;
    this.setState({
      ...this.state,
      target: {
        ...this.state.source,
        rate: rateRef
      }
    }, () => this.updateConversionRateAndExchangeValue());
  }

  /**
   * Amount entered must be a number or empty
   * @param amount
   */
  validateEnteredValue = (amount: string): boolean => {
    return !!+amount || amount === '';
  }

  updateConversionRateAndExchangeValue = (): void => {

    const sourceRatePrice = this.state.source.rate.price;
    const targetRatePrice = this.state.target.rate.price;
    const inputValue = this.state.source.inputValue;

    this.setState({
      ...this.state,
      conversionRate: sourceRatePrice / targetRatePrice,
      totalExchange: +((sourceRatePrice / targetRatePrice) * +inputValue).toFixed(6)
    })
  }

  /**
   * Handle exchange value input changes
   * @param event
   */
  handleChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    if (!this.validateEnteredValue(inputValue)) {
      return;
    }

    this.setState({
      ...this.state,
      source: {
        ...this.state.source,
        inputValue: inputValue
      }
    }, () => this.updateConversionRateAndExchangeValue());
  }

  getCurrencyExchangeValue = (): string => {
    const sourceSymbol = this.state.source.rate.symbol;
    const targetSymbol = this.state.target.rate.symbol;
    const exchangeValue = this.state.conversionRate.toFixed(6);

    return `1 ${sourceSymbol} = ${targetSymbol} ${+exchangeValue}`;
  }

  onSubmitExchangeForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: ExchangeData = {
      source: {
        currency: this.state.source.rate.symbol,
        amount: +this.state.source.inputValue,
      },
      target: {
        currency: this.state.target.rate.symbol,
        amount: this.state.totalExchange
      }
    }
    this.props.submitExchange(formData);
  }

  render() {
    return (
      <form onSubmit={this.onSubmitExchangeForm}>
        <h3>Exchange</h3>
        You send:
        <input type="text"
               onChange={this.handleChangeInputValue}
               value={this.state.source.inputValue}
        />
        <select
          onChange={this.handleChangeSourceCurrency}
          value={this.state.source.rate.symbol}
        >
          {this.props.rates.map((rate) => (
            <option
              key={rate.symbol}
              disabled={rate.symbol === this.state.target.rate.symbol}
              value={rate.symbol}
            >
              {rate.symbol}
            </option>
          ))}
        </select>

        <br />

        {this.getCurrencyExchangeValue()}

        <br />

        You receive:
        <input type="text"
               disabled
               value={this.state.totalExchange}
        />
        <select
          onChange={this.handleChangeTargetCurrency}
          value={this.state.target.rate.symbol}
        >
          {this.props.rates.map((rate) => (
            <option
              key={rate.symbol}
              disabled={rate.symbol === this.state.source.rate.symbol}
              value={rate.symbol}
            >
              {rate.symbol}
            </option>
          ))}
        </select>

        <br />

        <button type={"submit"}>
          Exchange now
        </button>
      </form>
    );
  }
}

export default ExchangeContainer;
