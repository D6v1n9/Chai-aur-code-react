import { useId, useState } from "react";

function InputBox({
    label,
    amount,
    onAmountChange, // This is a funciton as amount will change then bsed on that the state is also need to be changed
    onCurrencyChange,
    currencyOption = [],
    selectCurrency = "usd", // By default
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   
const [] = useState(amount);

const amountInputId = useId(); 
// Using this into label for the input as now they are associated with a Unique id
// Inside input id attribute will use the amountInputId
// and label Html for (this is same as for just because for is reserved to for loop so using HTML for)
// The value of the for attribute must be a single id for a labelable form-related element in the same document as the <label> element

    return (

        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    // Use of onAmountChange method
                    onChange={(e) => onAmountChange && 
                        onAmountChange(Number(e.target.value))}
                        // Typecase to Number as sometime e.target.value returns in string 
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    disabled={currencyDisable}
                    onChange={(e) => onCurrencyChange && 
                        onCurrencyChange(e.target.value)}
                >
                    
                    {currencyOption.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                        // For performance inside the loop you have to use key{}
                        // Note: If Performance is required inside loop in JSX use the key{} 
                        // inside this a unique field is to be passed (preferred id when using Database)
                        // Generally we pass the iterator in the key{}
                    ))}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;
