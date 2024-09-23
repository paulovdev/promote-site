// PaymentContext.js
import React, { createContext, useState } from 'react';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [paymentApproved, setPaymentApproved] = useState(false);

  return (
    <PaymentContext.Provider value={{ paymentApproved, setPaymentApproved }}>
      {children}
    </PaymentContext.Provider>
  );
};
