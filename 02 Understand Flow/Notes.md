## React creates its own dom using ReactDOM 
- **ReactDOM** :- ReactDOM is a package in React that provides DOM-specific methods to render elements or components in the actual DOM of a web page, enabling an efficient way to manage DOM elements.

- **<React.StrictMode>** :- It is safe mode and specific for development
- ```<App/>``` : App tag functionality is bought by JSX
#
### JSX
JSX is a syntax extension for JavaScript used in React to simplify building user interfaces by allowing you to write HTML-like code directly inside JavaScript, making it easier to create UI components more efficiently.
#

**"react-scripts"** inside package.json adds script tag inside the head of HTML 
which inject the JS file into HTML
![](https://i.postimg.cc/pTP8Pfg5/Screenshot-2025-05-29-194544.png)

- whereas inside Vite they have explicitly included the script 

#

### Summary
- Vite is lightweight.
- In vite it will directly inject main.jsx in index.html file 
- We can name both App.js & App.jsx but in vite development environment we have to use jsx
- Inside basic react .jsx extension only when the HTML returns (by convention)
- We can return only one component by a jsx function so it's good to wrap in <></> (called as fragment) or ```<div></div>```

