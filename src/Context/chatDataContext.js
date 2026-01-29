import { createContext, useContext, useState } from "react";

const ChatDataContext = createContext(null);

export const ChatDataProvider = ({ children }) => {
  const [quote, setQuote] = useState(null);
  const [booking, setBooking] = useState(null);

  return (
    <ChatDataContext.Provider
      value={{
        quote,
        setQuote,
        booking,
        setBooking,
      }}
    >
      {children}
    </ChatDataContext.Provider>
  );
};

export const useChatData = () => useContext(ChatDataContext);
