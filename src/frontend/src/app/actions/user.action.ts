type CreateUserAccountInput = {
  email: string;
  password: string;
};

export const createUserAccount = async ({
  email,
  password,
}: CreateUserAccountInput) => {
  const res = await fetch("/api/auth/signup/create", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Account creation failed.");
  }

  return data;
};
