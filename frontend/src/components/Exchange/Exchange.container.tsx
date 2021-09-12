import React from 'react';
import { ExchangeData, Rate } from "../../shared";
import { SectionTitle,
  PrimaryActionButton,
  ExchangeForm,
  ExchangeInputsWrapper,
  ExchangeRate,
} from "../StyledComponents"
import { ExchangeSingle } from "./index";

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
    this.handleChangeTargetCurrency = this.handleChangeTargetCurrency.bind(this);
    this.validateEnteredValue = this.validateEnteredValue.bind(this);
    this.updateConversionRateAndExchangeValue = this.updateConversionRateAndExchangeValue.bind(this);
    this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
    this.getExchangePriceLabel = this.getExchangePriceLabel.bind(this);
    this.onSubmitExchangeForm = this.onSubmitExchangeForm.bind(this);
  }

  componentDidMount() {
    this.updateConversionRateAndExchangeValue();
  }

  /**
   * Handle the change of the source currency dropdown option
   * @param event
   */
  handleChangeSourceCurrency = (event: React.ChangeEvent<HTMLSelectElement>): void => {
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

  /**
   * Handle the change of the target currency dropdown option
   * @param event
   */
  handleChangeTargetCurrency = (event: React.ChangeEvent<HTMLSelectElement>): void => {
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

  /**
   * Used to calculate the conversion rate based on the price difference between currencies and total to be exchanged
   * E.g.:
   * - Conversion Rate is: 1 Euro = 0.85 Dollar, so  = 1.176470
   * - Total exchange is the conversionRate * amount to be exchanged.
   */
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

  /**
   * Display the conversion price to the user in a friendly way.
   */
  getExchangePriceLabel = (): string => {
    const sourceSymbol = this.state.source.rate.symbol;
    const targetSymbol = this.state.target.rate.symbol;
    const exchangeValue = this.state.conversionRate.toFixed(6);
    return `1 ${sourceSymbol} = ${targetSymbol} ${+exchangeValue}`;
  }

  /**
   * Handle the submit exchange form submission
   * @param event
   */
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
      <ExchangeForm onSubmit={this.onSubmitExchangeForm}>
        <SectionTitle>Exchange</SectionTitle>

        <ExchangeInputsWrapper>
          {/* Source component (from where the amount will be sent) */}
          <ExchangeSingle
            inputType={"source"}
            options={this.props.rates}
            changeSelectOption={this.handleChangeSourceCurrency}
            changeInputValue={this.handleChangeInputValue}
            inputValue={this.state.source.inputValue}
            selectValue={this.state.source.rate.symbol}
            selectedOtherCurrency={this.state.target.rate.symbol}
          />

          <ExchangeRate>
            {this.getExchangePriceLabel()}
          </ExchangeRate>

          <ExchangeSingle
            inputType={"target"}
            options={this.props.rates}
            changeSelectOption={this.handleChangeTargetCurrency}
            inputValue={this.state.totalExchange.toString()}
            selectValue={this.state.target.rate.symbol}
            selectedOtherCurrency={this.state.target.rate.symbol}
          />
        </ExchangeInputsWrapper>

        <PrimaryActionButton type={"submit"}>
          Exchange now
        </PrimaryActionButton>
      </ExchangeForm>
    );
  }
}

export default ExchangeContainer;
