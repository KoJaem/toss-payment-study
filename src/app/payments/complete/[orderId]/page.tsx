interface PaymentResponse {
  orderName: string;
  orderId: string;
  approvedAt: string;
  easyPay: {
    provider: string;
    amount: string;
    discountAmount: string;
  } | null;
  card: {
    company: string;
    amount: number;
  } | null;
}

const CompletePage = async ({ params }: { params: { orderId: string } }) => {
  const secretKey = process.env.TOSS_SECRET_KEY || "";
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const url = `https://api.tosspayments.com/v1/payments/orders/${params.orderId}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    // Handle error
    throw new Error("Failed to fetch data");
  }

  const payments: PaymentResponse = await response.json();

  console.log("payments", payments);

  return (
    <section>
      <h1>결제가 완료되었습니다</h1>
      <ul>
        <li>결제 상품: {payments.orderName}</li>
        <li>주문번호: {payments.orderId}</li>
        <li>
          카드회사: {payments.card?.company ?? payments.easyPay?.provider}
        </li>
        <li>
          결제금액: {payments.card?.amount ?? payments.easyPay?.amount} 원
        </li>
        <li>
          결제승인날짜:
          {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}
        </li>
      </ul>
    </section>
  );
};

export default CompletePage;
