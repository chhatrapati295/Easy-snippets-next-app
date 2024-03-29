import { db } from "@/app/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CreateSnippetPage = () => {
  async function snippetCreateFunc(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });
    // console.log(snippet);
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="m-4 border border-gray-400 px-4 py-3 rounded-lg">
      <h2 className="text-2xl font-bold">Create Snippet</h2>
      <form
        action={snippetCreateFunc}
        className="flex flex-col gap-2 rounded-md py-3"
      >
        <label htmlFor="title" className="">
          Title
        </label>
        <input
          type="text"
          required
          id="title"
          name="title"
          className="border border-gray-400 rounded p-2 outline-blue-300"
        />
        <label htmlFor="title" className="">
          Code
        </label>
        <textarea
          name="code"
          required
          id="code"
          rows={6}
          className="border border-gray-400 rounded p-2 outline-blue-300"
        ></textarea>
        <button type="submit" className="bg-blue-300 rounded p-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateSnippetPage;
