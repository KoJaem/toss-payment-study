import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId, paymentKey, amount } = req.query;
  const secretKey = process.env.TOSS_SECRET_KEY;

  const url = "https://api.tosspayments.com/v1/payments/confirm";

  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  await fetch(url, {
    method: "post",
    body: JSON.stringify({
      amount,
      orderId,
      paymentKey,
    }),
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  }).then(res => res.json);
  // * 추가적으로, 실제 PRD 환경에서는 토스에서 전달받은 결제 정보와, 디비에 저장 되어있는 결제 정보가 같은지 유효성검사를 꼭 해줘야함

  res.redirect(`/payments/complete/${orderId}`);
}
