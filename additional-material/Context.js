import React, { createContext, useState } from "react";

const DataUserCtx = createContext();

export const DataUserProvider = ({ children }) => {
  const [username, setUsername] = useState();
  return (
    <DataUserCtx.Provider
      value={{
        username,
        setUsername,
      }}
    >
      {children}
    </DataUserCtx.Provider>
  );
};

export default DataUserCtx;
