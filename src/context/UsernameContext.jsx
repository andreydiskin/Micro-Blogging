import React, { createContext, useState } from "react";

export const UsernameContext = createContext();

export const UsernameContextProvider = (props) => {

    const [userName, setUserName] = useState("");

    return (
        <UsernameContext.Provider
          value={{
            userName,
            setUserName,
          }}
        >
          {props.children}
        </UsernameContext.Provider>
      );
}