import { createContext, useContext, useState } from 'react';
import defaultData from '../data/portfolio.json';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolioData');
      return saved ? JSON.parse(saved) : defaultData;
    } catch { return defaultData; }
  });

  const updateData = (section, value) => {
    setData(prev => {
      const updated = { ...prev, [section]: value };
      localStorage.setItem('portfolioData', JSON.stringify(updated));
      return updated;
    });
  };

  const resetData = () => {
    localStorage.removeItem('portfolioData');
    setData(defaultData);
  };

  return (
    <DataContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
