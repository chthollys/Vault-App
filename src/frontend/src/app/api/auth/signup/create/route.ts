import { createUser } from "@/app/actions/db.action";
import { signIn } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newUser = await createUser({ name, email, password });
  if (!newUser)
    return NextResponse.json(
      { error: "Failed to create user account." },
      { status: 500 }
    );

  const res = await signIn("credentials", { email, password, redirect: false });
  if (!res || res.error) {
    return NextResponse.json(
      { error: res?.error ?? "Sign-in failed" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true, user: newUser });
}
