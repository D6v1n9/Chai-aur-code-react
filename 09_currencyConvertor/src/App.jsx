import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { useState } from "react";
import InputBox from "./components";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  // As useCurrencyInfo will return the data which is in Object form
  // So the option for the user should be the key part of the Object in which it could be converted

  const options = Object.keys(currencyInfo); // Inside the InputBox.jsx currencyOption array

  const swap = () => {
    // As i click on swap button this is trigered
    setTo(from);
    setFrom(to);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]); // Final output
  }; // Now this will call the innet setSate when called

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-neutral-800"
      style={{
        backgroundImage: `url(BackgroundImg)`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox 
                label="From" 
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setFrom(currency)}
                currencyOption={options}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}  // 
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox 
                label="To"
                amount={convertedAmount}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(currency) => setTo(currency)}
                currencyOption={options}
                selectCurrency={to}
                amountDisable   // or amountDisable={true} , So amount in To cannot be used by user

              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
