"use server";

import { db } from "@/app/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function EditSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number | undefined) {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath("/");
  redirect("/");
}
