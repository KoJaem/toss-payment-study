"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PaymentCompleteContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const init = async () => {
      // 백엔드에 쏘는 로직
      console.log("paymentKey", searchParams?.get("paymentKey"));
      console.log("orderId", searchParams?.get("orderId"));
      console.log("amount", searchParams?.get("amount"));
    };
    init();
  }, [searchParams]);

  return (
    <div>
      <div>결제 성공</div>
    </div>
  );
}

export default function PaymentCompletePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PaymentCompleteContent />
    </Suspense>
  );
}
