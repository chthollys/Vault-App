import { NextRequest, NextResponse } from "next/server";
import prisma from "~/prisma/db";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/app/actions/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email)
    return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const cookieStore = await cookies();
  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return NextResponse.json(
      { error: "User already exist, please proceed to login" },
      { status: 400 }
    );

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

  cookieStore.set({
    name: "otp-sent",
    value: email,
    httpOnly: true,
    maxAge: 5 * 60,
    path: "/",
    secure: true,
  });

  return NextResponse.json({ success: true });
}
