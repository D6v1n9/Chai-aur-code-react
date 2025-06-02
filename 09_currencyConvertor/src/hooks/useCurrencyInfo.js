// File name to be JS when when it returns pure JS
// File name to be JSX when it returns JSX

// function hello() {
//     return []                    // This also custom hook as it is also a function
// }                                

// custom hook can use the build in hooks

import {useEffect, useState} from "react"

// Functionality of Our hook is that is when it is called it will call an API
// You can also perform this by Fetch 
// But the best method will be to use useEffect() as it trigers when the life cycle starts

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        )
        .then((res) => res.json())  // As response was in String
        .then((res) => setData(res[currency]))          // This res is in JSON format and based on this res it will give 
    }, [currency])                                      // the Output which is to be reflected in UI thus use useState() hook
    return data
}

export default useCurrencyInfo; 
// Full method is returned, So now we will have access to data, setData