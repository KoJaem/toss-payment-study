"use client";
import {
  loadTossPayments,
  TossPaymentsInstance,
} from "@tosspayments/payment-sdk";
import React from "react";

const PaymentButton: React.FC = () => {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "";

  // if (!clientKey || !originUrl) {
  //   throw new Error(
  //     "Client key or origin URL is not defined in environment variables"
  //   );
  // }

  const payment = () => {
    loadTossPayments(clientKey).then((tossPayments: TossPaymentsInstance) => {
      tossPayments
        .requestPayment("CARD", {
          amount: 10000, // Replace with actual amount
          orderId: `${new Date().getTime()}`, // Replace with actual order ID
          orderName: "맥북 10000원", // Replace with actual product name
          customerName: "KoJaem", // Replace with actual customer name
          successUrl: `${window.location.origin}/payments/complete`,
          failUrl: `${window.location.origin}/payments/fail`,
        })
        .catch(error => {
          if (error.code === "USER_CANCEL") {
            // Handle user cancellation
          } else if (error.code === "INVALID_CARD_COMPANY") {
            // Handle invalid card company error
          }
        });
    });
  };

  return <button onClick={payment}>결제하기</button>;
};

export default PaymentButton;
