import { NextRequest, NextResponse } from "next/server";
import prisma from "~/prisma/db";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { getUserByEmail } from "@/app/actions/db.action";
import { getCookieValue } from "@/app/actions/cookies.action";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email)
    return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const existingUser = await getUserByEmail(email);
  if (existingUser)
    return NextResponse.json(
      { error: "User already exist, please proceed to login" },
      { status: 400 }
    );

  const validatedEmail = await getCookieValue("otp-verified");
  if (validatedEmail && validatedEmail === email) {
    return NextResponse.json(
      {
        message:
          "Email already verified, please proceed to set your new account password",
        redirect: "/set-password",
      },
      { status: 200 }
    );
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000);

  const existingToken = await prisma.verificationToken.findFirst({
    where: { identifier: email },
  });

  if (existingToken) {
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });
  }

  await prisma.verificationToken.create({
    data: { identifier: email, token: otp, expires },
  });

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  await transport.sendMail({
    to: email,
    from: process.env.EMAIL_FROM,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
    html: `<p>Your OTP code is:</p><h2>${otp}</h2>`,
  });

  const res = NextResponse.json({ success: true });
  res.cookies.set("otp-sent", email, {
    httpOnly: true,
    maxAge: 5 * 60,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
