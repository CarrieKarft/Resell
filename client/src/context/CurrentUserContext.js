import {useState, useEffect, createContext} from 'react';

const CurrentUserContext = createContext();

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
      fetch('/me')
      .then((r) => {
          if(r.ok) {
              r.json().then((currentUserData) => setCurrentUser(currentUserData))
          } else {
              r.json().catch((errorData) => alert(errorData.errors))
          }
      })
    }, [])

    return <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>{children}</CurrentUserContext.Provider>;
}

export { CurrentUserContext, CurrentUserProvider };