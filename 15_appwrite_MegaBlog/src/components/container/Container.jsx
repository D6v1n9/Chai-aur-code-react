import React from "react";

function Container({children}) {
    // return (
    //     <div className='w-full max-w-7xl mx-auto px-4'>
    //         {children}
    //     </div>
    // )

    // You can also return when you have only a line 
    return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container