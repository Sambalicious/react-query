import { createContext, PropsWithChildren, useContext, useState } from "react";
interface IGlobalContext {
  user: string;
  changeName: () => void;
}

const UserContext = createContext({} as IGlobalContext);
const useUserContext = () => useContext(UserContext);

function UserProvider({ children }: PropsWithChildren) {
  const [name, setState] = useState("sam");
  const changeName = () => {
    setState("test");
  };

  return (
    <UserContext.Provider value={{ user: name, changeName: changeName }}>
      {children}
    </UserContext.Provider>
  );
}

export { useUserContext, UserProvider };
