import React from 'react';
import { Rate } from "../../shared";

interface IProps {
  options: Rate[];
  changeSelectOption: (value: string) => any;
  defaultOption: string;
  changeInputValue: (value: number) => void;
}

interface IState {
  selectedRate: Rate;
  amount: string;
}

class ExchangeSingle extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedRate: {} as Rate,
      amount: '',
    };

    this.onChangeInputValue = this.onChangeInputValue.bind(this);
    this.validateEnteredValue = this.validateEnteredValue.bind(this);
    this.onHandleSelectChange = this.onHandleSelectChange.bind(this);
  }

  componentDidMount() {
    const defaultRate = this.props.options.find((x) => x.symbol === this.props.defaultOption)!;
    this.setState({ ...this.state, selectedRate: defaultRate })
  }

  /**
   * Handle exchange dropdown option changes
   * @param event
   */
  onHandleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = event.target.value;
    const rateRef = this.props.options.find((e) => e.symbol === selectedCurrency)!;
    this.setState({ ...this.state, selectedRate: rateRef });
    this.props.changeSelectOption(selectedCurrency);
  }

  /**
   * Amount entered must be a number or empty
   * @param amount
   */
  validateEnteredValue = (amount: string): boolean => {
    return !!+amount || amount === '';
  }

  /**
   * Handle exchange value input changes
   * @param event
   */
  onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (!this.validateEnteredValue(inputValue)) {
      return;
    }

    this.setState({ ...this.state, amount: inputValue});
    this.props.changeInputValue(+inputValue);
  }

  render() {
    return (
      <>
        <select
          onChange={this.onHandleSelectChange}
          value={this.state.selectedRate.symbol}
        >
          {this.props.options.map((rate) => (
            <option
              key={rate.symbol}
              value={rate.symbol}
            >
              {rate.symbol}
            </option>
          ))}
        </select>

        <input type="text"
               onChange={this.onChangeInputValue}
               value={this.state.amount}
        />
      </>
    );
  }
}

export default ExchangeSingle;
