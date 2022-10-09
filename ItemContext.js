import { createContext, useState } from "react";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);

  const addItem = (id, name, price) => {
    setSelected((prevState) => [...prevState, { id, name, price }]);
  };

  return (
    <ItemContext.Provider value={{ selected, addItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
