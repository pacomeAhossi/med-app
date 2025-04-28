import { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerNotificationRefresh = () => {
    setRefreshKey(prev => prev + 1); // Juste incrémenter pour forcer un rafraîchissement
  };

  return (
    <NotificationContext.Provider value={{ refreshKey, triggerNotificationRefresh }}>
      {children}
    </NotificationContext.Provider>
  );
};
