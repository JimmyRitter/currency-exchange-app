import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`

export const AppWrapper = styled.div`
  text-align: center;
  background-image: linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export const WalletSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`

export const WalletWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`

export const WalletItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 20px;
  border-radius: 5px;
  padding: 20px;
  min-width: 150px;
  box-shadow: 0 5px 10px rgb(0 0 0 / 0.3);
  background-color:rgba(0, 0, 0, 0.15)
`

export const SectionTitle = styled.h2`
  margin-top: 5px;
  color: #134074;
  text-shadow: 1px 1px #0B2545;
`

export const ExchangeForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const ExchangeInputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const ExchangeRate = styled.span`
  border: solid 1px green;
  border-radius: 15px;
  background-color: green;
  padding: 5px 10px;
  margin: 0 5px;
  box-shadow: 0 5px 10px rgb(0 0 0 / 0.3);
  align-self: center;
`

export const ExchangeSingleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ExchangeInputSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const PrimaryActionButton = styled.button`
  color: white;
  font-size: 1em;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 5px 10px rgb(0 0 0 / 0.3);
  background-color:rgba(0, 0, 0, 0.15);
  margin-top: 10px;
  align-self: center;
`
