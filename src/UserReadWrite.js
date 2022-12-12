import React, { useEffect, useState } from "react";
import App from "./App";
import UserContext from "./userContext";
import JoblyApi from "./api";
import useLocalStorage from "./useLocalStorage";
import parseJWT from "./parseJWT";

function UserReadWrite() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  let tokenInLS, setTokenInLS
  [tokenInLS, setTokenInLS] = useLocalStorage(tokenInLS, "")

  useEffect(() => {
    // on start, set token to whatever is in LS
    if (tokenInLS && !user.username) {
      setToken(tokenInLS);
    } 
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    // on token change, if no user, set user and update token in LS
    if (token && !user.username) {
      JoblyApi.token = token;
      setTokenInLS(token);
      async function fetchUser(t) {
        const { username } = parseJWT(t);
        const u = await JoblyApi.getUser(username);
        setUser(u);
      }
      fetchUser(token);
    // if user and empty token, complete logout by clearing LS and user context
    } else if (!token && user.username) {
      setUser({});
      setTokenInLS("")
    }
  // eslint-disable-next-line
  }, [token])


  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <App />
    </UserContext.Provider>
  )
}

export default UserReadWrite