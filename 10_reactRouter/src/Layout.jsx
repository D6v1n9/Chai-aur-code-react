import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// For Dynamic Rendering so that Header and Footer remain same and the Mid part 
// Home, Aboutus, Contact keeps on render between Header and Footer
// For this import Outler from react-router-dom

import { Outlet } from "react-router-dom";
// Outlet uses this Layout as base and Outler tag will be Dynamic

function Layout() {
    return (
        <>
            <Header/>
                <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout