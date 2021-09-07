import React from 'react';
import { ExchangeSingle } from "./index";
import { Rate } from "../../shared";

interface IProps {
  rates: Rate[];
}

class ExchangeContainer extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = {}
  }

  handleChangeSelection = (currency: string) => {
    const rate = this.props.rates.find((x) => x.symbol === currency);
    console.log(rate);
  }

  getCurrentValue = (e: number): number => {
    console.log(e);
    return e;
  }

  render() {
    return (
      <>
        <h3>Exchange</h3>
        <ExchangeSingle options={this.props.rates}
                        defaultOption={"EUR" || this.props.rates[0].symbol}
                        onChangeSelection={this.handleChangeSelection}
                        currentValue={(e) => this.getCurrentValue(e)}
        />

        <br/>

        <ExchangeSingle options={this.props.rates}
                        defaultOption={"USD" || this.props.rates[1].symbol}
                        onChangeSelection={this.handleChangeSelection}
                        currentValue={(e) => this.getCurrentValue(e)}
        />
      </>
    );
  }
}

export default ExchangeContainer;
