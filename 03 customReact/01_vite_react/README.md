Lec summary : [@38:00 Lec 4](https://youtu.be/kAOuj6o7Kxs?t=2422)
# Interview
```javascript
import Chai from "./chai"


function App() {
  const username = "chai aur code"

  return (
    <>
    <Chai/>
    <h1>chai aur react {username}</h1>
    <p>test para</p>
   </>
  )
}
```
- {username} is a JavaScript expression that evaluates to a value—in this case, the string "chai aur code".
- In JSX (JavaScript XML), curly braces {} are used to embed JavaScript expressions inside HTML-like code.
## JSX Expression Rules:
Inside JSX:

✅ Valid: Any expression that returns a value:

{username} → valid

{1 + 2} → valid

{someFunction()} → valid

❌ Invalid: Statements that don't return a value:

{if (true) {}} → invalid

{while (...) {...}} → invalid

**Because if is a statement (not an expression), it can’t be used directly inside JSX.**

## Summary:
- {username} injects the value of the variable username into the JSX.

- It must be an expression, not a statement.

- JSX allows embedding dynamic content using {}.