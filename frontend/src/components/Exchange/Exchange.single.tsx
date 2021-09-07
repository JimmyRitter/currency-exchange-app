import React from 'react';
import { Rate } from "../../shared";

interface IProps {
  options: Rate[];
  onChangeSelection: (value: string) => any;
  defaultOption: string;
  currentValue: (value: number) => number;
}

interface IState {
  selectedRate: Rate;
}

class ExchangeSingle extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedRate: {} as Rate,
    };
  }

  componentDidMount() {
    const defaultRate = this.props.options.find((x) => x.symbol === this.props.defaultOption)!;
    console.log(defaultRate);
    this.setState({ ...this.state, selectedRate: defaultRate })
  }

  onHandleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = event.target.value;
    const rateRef = this.props.options.find((e) => e.symbol === selectedCurrency)!;
    this.setState({ ...this.state, selectedRate: rateRef });
    this.props.onChangeSelection(selectedCurrency);
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

        {this.state.selectedRate?.price}

        <input type={"number"}
               onChange={(event) => this.props.currentValue(+event.target.value)}
        />
      </>
    );
  }
}

export default ExchangeSingle;
