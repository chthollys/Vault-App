import { NextRequest, NextResponse } from "next/server";
import prisma from "~/prisma/db";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const record = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: email,
        token: otp,
      },
    },
  });

  if (!record || record.token !== otp) {
    return NextResponse.json({ error: "Invalid OTP." }, { status: 400 });
  }

  if (record.expires < new Date()) {
    return NextResponse.json({ error: "Expired OTP." }, { status: 400 });
  }

  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: email,
        token: otp,
      },
    },
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set("otp-verified", email, {
    httpOnly: true,
    maxAge: 5 * 60,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
