import React, { createContext, useState } from 'react'
export const globalState = createContext()

function context ({ children }) {
    
    const [showSideBar, setShowSideBar] = useState(true)

    return ( 
        <globalState.Provider value={{ showSideBar, setShowSideBar }}>
            {children}
        </globalState.Provider>
    )
}

export default context