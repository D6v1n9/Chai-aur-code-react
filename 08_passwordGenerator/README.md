## useState()
useState is a React Hook that lets you add a state variable to your component.

```const [state, setState] = useState(initialState)```

### Usage

- Adding state to a component
- Updating state based on the previous state
- Updating objects and arrays in state
- Avoiding recreating the initial state
- Resetting state with a key
- Storing information from previous renders

### Parameters

#### setState()
- The set function returned by useState lets you update the state to a different value and trigger a re-render. 
- You can pass the next state directly, or a function that calculates it from the previous state: ```setState((prevState) => prevState + 1)```
### Returns 
useState returns an array with exactly two values:


## useCallback()
useCallback is a React Hook that lets you cache a function definition between re-renders.

```const cachedFn = useCallback(fn, dependencies)```
### Usage
- Skipping re-rendering of components
- Updating state from a memoized callback
- Preventing an Effect from firing too often
- Optimizing a custom Hook

### Parameters

#### ```fn```
The function value that you want to cache. It can take any arguments and return any values. ***React will return (not call!) your function back to you during the initial render***. On next renders, React will give you the same function again if the dependencies have not changed since the last render. Otherwise, it will give you the function that you have passed during the current render, and store it in case it can be reused later. ***React will not call your function. The function is returned to you so you can decide when and whether to call it.***

#### dependencies
**The list of all reactive values referenced inside of the fn code**. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is configured for React, it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like [dep1, dep2, dep3]. React will compare each dependency with its previous value using the **Object.is** comparison algorithm.

## use Effect()
```useEffect(setup, dependencies?)```

#### setup
callback function


## ***NOTE***
#### Difference between dependencies of useEffect adn useCallback

- ***useCallback dependencies are used for optimization thus use also pass a setState in which the value is being set for cache optimization***

- ***useEffect dependencies are used for the calling of setup callback function if there is any change in the dependencies***


## useRef()

- useRef is a React Hook that lets you reference a value that’s not needed for rendering.
- Used when you have to take reference of anything 
- Used to provide good UI by selecting a specific fields that changes on action
- **It return a ref Object**

```const ref = useRef(initialValue)```

### Usage
- useRef returns a **ref object** with a single *****current*** property** initially set to the **initial value** you provided.

- Changing a ref does not trigger a re-render. This means refs are perfect for storing information that doesn’t affect the visual output of your component.
