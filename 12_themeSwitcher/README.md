Method-2 of creating Context
## Summary
so lets me break down this whole thing 
first we created context name "ThemeContext" also providing some predefined method and property as an object.
Also exported the ThemeContext.provider to wrap on App component so every child can have access to these methods and properties
Also to save an extra import statement we exported a hook name useTheme that itself exports the hook with current context name ThemeContext
then the App component set the 1st part of the functionality where we are defining methods that will toggle html class in order to envoke the dark style provide in Card component by tailwind
The functionality includes first setting up useEffect hook so we can run this code again whenever the dependency changes which will be Theme Mode along with this dark theme and light theme set's useState state for furthure use like for useEffect and input checked in toggleBtn to set the Html after removing any pre-existing class
then we completed the final functionality in toggleBtn by destructuring the methods and property now containing value and functionality
to just get manipulated by checked prop of input and conditional statement
because we didn't use any button for toggle but input as a checkbox that's why we have to use this checked property.

## Step-1
- Create contexts folder inside src
- Create a file theme.js (as it will not return any jsx)
- ### Theme.js
    ```javascript
    // Inside Theme.js
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
    ```
- ### App.jsx
    - Wrap the content in ThemeProvider
    - Pass the values as Object so that button and card have access to these properties
    - As there was no functionality of functions declared in Theme.js
    - So created the same name function giving the functionality
    - Create components Card and ThemeBtn
    - ```javascript
        function App() {
            const [themeMode, setThemeMode] = useState("light");
            // As inside theme.js we have not defined the functionality
            // So now you have lightTheme and darkTheme as a function but not have its functionality 
            // so in this case create the function wil the same name and write there functionality now this functionality will be se in them

            const lightTheme = () => {
                setThemeMode("light")
            }
            const darkTheme = () => {
                setThemeMode("dark")
            }

            // Actual theme change in theme

            useEffect(()=>{
                document.querySelector('html').classList.remove('light', 'dark')
                document.querySelector('html').classList.add(themeMode)
            }, [themeMode])

            return (
                <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
                <div className="flex flex-wrap min-h-screen items-center">
                    <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        <ThemeBtn/>
                    </div>

                    <div className="w-full max-w-sm mx-auto">                                   
                        <Card/>
                    </div>
                    </div>
                </div>
                </ThemeProvider>
            );
        }
        ```
    - #### Updation in ThemeBtn.jsx
        ```javascript
        import useTheme from "../contexts/theme";


        export default function ThemeBtn() {
        //Now you will have to use the values themeMode and methods inside ThemeBtn
        // So as in miniContext project we accessed the value using useContext hook
        // But here we did the same using a hook inside Theme.js as useTheme()

        const {themeMode, lightTheme, darkTheme} = useTheme();
        const onChangeBtn = (e) => {
            const darkModeStatus = e.currentTarget.checked
            if(darkModeStatus) {
            darkTheme()
            } else {
            lightTheme()
            }
        }


        return (
            <label className="relative inline-flex items-center cursor-pointer">
            <input 
                type="checkbox" 
                value="" 
                className="sr-only peer"
                onChange={onChangeBtn} 
                checked={themeMode==="dark"}
                
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 ">
                Toggle Theme
            </span>
            </label>
         );
        }
        ```
