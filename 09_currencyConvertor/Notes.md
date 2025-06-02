[Link to Lec](https://youtu.be/AFDYnd-XPa8)

![](https://i.postimg.cc/kXtvKv0Q/Currency-Convertor-App.png)

### Step 1
Creation of custom hook which calls our API

### Step 2
- #### Creation of Reusable components
    - Write all the possible props and functions of InputBox inside InputBox funtion
    - Chose properties and function such that they call for an API and how its change will affect the state thus have a properties which should help in relflecting the UI
    - [Expression vs Statement in JSX {}](https://chatgpt.com/share/683c323a-a0b0-8007-a069-a33bd7a11c3d)

    - **Note**: If Performance is required inside loop in JSX use the **key{}** inside this a unique field is to be passed (***preferred*** id when using Database)
    ```javascript
    {currencyOption.map((currency) => {
        // For performance inside the loop you have to use key{}
        <option key={currency} value={currency}>
            {currency}
        </option>
    })}                 
    ```
    - Generally we pass the iterator in the key{}

- Inside the components create anothe file **index.js** from where you can export each and every copmonent at one place

### Step 3 
- Optimization of InputBox.jsx

#### Using useId() hook
- useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.
- ```const id = useId()```

- **Usage**
    - Generating unique IDs for accessibility attributes
    - Generating IDs for several related elements
    - Specifying a shared prefix for all generated IDs
    - Using the same ID prefix on the client and the server   

- **PITFALL Do not call useId to generate keys in a list**

- The HTMLLabelElement.htmlFor property reflects the value of the for content property. 
- The value of the for attribute must be a single idfor a labelable form-related element in the same document as the <label> element. 

### Step 4

Working with App.jsx

- State setup in App.jsx 
    - State for amount 
    - State for From
    - State for to 
    - State of Convert button

- Use custom hook, useCurrencyInfo

- Working with Functionality
    - Swap functionality 
    - Convert function which gets triggered on onClick


- Working with return () in App.jsx and passing proper attributes 
    1) Inside form onSubmit convert will be called

[Chatgpt](https://chatgpt.com/share/683d2f67-df30-8007-9b99-7ced9cba2381)
    ✅ Yes — onAmountChange expects a function, and here's the flow:
🧠 You can understand it like this:
In the parent component:
jsx
Copy
Edit
<InputBox onAmountChange={(amount) => setAmount(amount)} />
You're passing a function to InputBox:

That function takes an argument called amount

It calls setAmount(amount), which updates state

In the InputBox component:

```javascript
<input
  type="number"
  onChange={(e) => onAmountChange(Number(e.target.value))}
/>
```
e.target.value is the value entered in the input (like "200")

Number(e.target.value) converts it to a number (like 200)

This number is passed to the onAmountChange function you gave earlier

🔁 Full Flow Step-by-Step:
 - User types "200" in input.

 - onChange triggers inside InputBox.

 - Number(e.target.value) → 200 (as a number).

 - That 200 is passed to onAmountChange(200).

 - The parent function (amount) => setAmount(amount) is called with 200.

 - setAmount(200) runs → React updates the state.

🧾 Final Analogy:

```javascript
<InputBox onAmountChange={(amountFromInput) => {
    // amountFromInput === Number(e.target.value)
    setAmount(amountFromInput);
}} />
```
So yes — inside InputBox, onAmountChange(amount) is effectively using the value that came from e.target.value.

