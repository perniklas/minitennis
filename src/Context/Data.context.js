import { createContext } from "react";

const DataContext = createContext({
  users: [],
  matches: [],
  tournaments: []
});

export default DataContext;