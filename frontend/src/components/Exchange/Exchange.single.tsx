import React from 'react';
import { Rate } from "../../shared";

interface IProps {
  inputType: "source" | "target";
  options: Rate[];
  changeSelectOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  changeInputValue?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  selectValue: string;
  selectedOtherCurrency: string
}

const ExchangeSingle = (props: IProps) => {
  return (
    <>
      <span>
        {props.inputType === "source" ? "You send:" : "You receive:"}
      </span>
      <input type="text"
             disabled={props.inputType === "target"}
             onChange={props.changeInputValue}
             value={props.inputValue}
      />
      <select
        onChange={props.changeSelectOption}
        value={props.selectValue}
      >
        {props.options.map((rate) => (
          <option
            key={rate.symbol}
            disabled={rate.symbol === props.selectedOtherCurrency}
            value={rate.symbol}
          >
            {rate.symbol}
          </option>
        ))}
      </select>
    </>
  );
}

export default ExchangeSingle;
