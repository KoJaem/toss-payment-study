"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentFailContent() {
  const searchParams = useSearchParams();

  return (
    <div>
      <div>결제 실패</div>
      <div>{searchParams?.get("code") || ""}</div>
      <div>{searchParams?.get("message") || ""}</div>
    </div>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PaymentFailContent />
    </Suspense>
  );
}
