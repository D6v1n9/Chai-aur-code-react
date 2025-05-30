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
  // {username} :- this is Evaluated expression therfore it should have final outcome of JS 
  // { if(true){} } :- Not allowed as it should have final outcome of JS
}
/*

JSX Expression Rules:
Inside JSX:

✅ Valid: Any expression that returns a value:

{username} → valid

{1 + 2} → valid

{someFunction()} → valid

❌ Invalid: Statements that don't return a value:

{if (true) {}} → invalid

{while (...) {...}} → invalid

Because if is a statement (not an expression), it can’t be used directly inside JSX.

*/



export default App
