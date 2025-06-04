import { useContext, createContext } from "react";

// Similar to UserContext creating in project 11_miniContext
// But now passing the default value to createContext() :- Means when context is created what values it will already have
// Inside this case we want a Object as default with values
export const ThemeContext = createContext({
    themeMode: "light", // In the starting of application it will have light mode
    darkTheme: ()=>{},
    lightTheme: ()=>{}
})
// Whenever someone will call the context will recive this object with variable and methods

export const ThemeProvider = ThemeContext.Provider // Instead of creating into another file 


// You will mostly see people creating there custom hook here 
// Hook is a function
// Unlike the project 11_miniContext inside login.jsx you have to useContext(UserContext) 
export default function useTheme() {
    return useContext(ThemeContext)
}

// This all was to reduce the file import and creation of multiple files
// So now you can directly import useTheme() and will have access to all the values like themeMode and methods
// And ThemeProvider will be used to wrap but you will have to pass the value attribute in it 