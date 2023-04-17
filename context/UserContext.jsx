import { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (data?.user || data?.user === null) {
          setUser(data.user);
          setLoading(false);
        }
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    return () => checkUser();
  }, [loading]);

  const info = {
    user,
    setUser,
    loading,
    setLoading,
    logout,
  };

  return <UserContext.Provider value={info}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

export default UserContextProvider;
