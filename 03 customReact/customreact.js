<<<<<<< HEAD
//index.js file

function customRender(reactElement, container) {
    
=======
// This file will render the element into index.html file similar to index.js in react

function customRender(reactElement, container) {
    /*
>>>>>>> c1dc7a0b19926638031a31ddcb15ab8ba8f97eb1
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    domElement.setAttribute('href', reactElement.props.href)
    domElement.setAttribute('target', reactElement.props.target)

    container.appendChild(domElement)
<<<<<<< HEAD
    
}

=======
    */

    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    for (const prop in reactElement.props) {
        if (prop === 'children') continue;
        domElement.setAttribute(prop, reactElement.props[prop])
    }
    container.appendChild(domElement)
    
}
 // the react element is parsed (Internally react also do the same for the element)
>>>>>>> c1dc7a0b19926638031a31ddcb15ab8ba8f97eb1
const reactElement = {
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    children: 'Click to visit google'
};

const mainContainer = document.getElementById('root');
customRender(reactElement, mainContainer);