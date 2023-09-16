"use server";

import { customInitApp } from "@/lib/firebase/firebase-admin";
import { auth } from "firebase-admin";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

customInitApp();

export async function updateUserSetting({
  userId,
  firstName,
  lastName,
}: {
  userId: string;
  firstName: string;
  lastName: string;
}) {
  await auth().updateUser(userId, {
    displayName: `${firstName} ${lastName}`,
  });
  revalidatePath("/dashboard/settings");
}

export async function updatePasswordSetting({
  userId,
  oldPassword,
  newPassword,
}: {
  userId: string;
  oldPassword: string;
  newPassword: string;
}) {
  const user = await auth().getUser(userId);
  await auth().generatePasswordResetLink(user.email as string);
  console.log(oldPassword, newPassword);
  revalidatePath("/dashboard/settings");
}

export async function updateEmailSetting({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  await auth().updateUser(userId, {
    email,
  });
  cookies().delete('session')
}
