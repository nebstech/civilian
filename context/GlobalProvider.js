import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setisLoading] = useState(true)


  useEffect(() => {
    // Create Special Function
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        // Values for whole app
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}