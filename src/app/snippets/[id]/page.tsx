import { db } from "@/app/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import * as actions from "@/actions";

interface SnippetParamProps {
  params: {
    id: string;
  };
}
export default async function showSnippetPage(props: SnippetParamProps) {
  await new Promise((r) => setTimeout(r, 1000));
  const snippet = await db.snippet.findFirst({
    where: {
      id: +props.params.id,
    },
  });

  const handleDeleteSnippet = actions.deleteSnippet.bind(null, snippet?.id);

  if (!snippet) {
    notFound();
  }
  return (
    <div className="flex flex-col gap-4 py-2">
      <h2 className="font-bold text-xl flex gap-3 items-center">
        <Link href={"/"} className="flex gap-2 items-center">
          <IoIosHome color="blue" /> Home
        </Link>{" "}
        <span>/</span> <span>Snippet View page</span>
      </h2>
      <div className="flex flex-col gap-3 p-2 rounded-md">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">
            {snippet?.id + ". " + snippet?.title}
          </span>
          <div className="flex gap-2 items-center">
            <Link href={`/snippets/${snippet.id}/edit`}>
              <button className="border py-1 font-medium px-4 text-xs rounded-md bg-blue-400 text-white">
                Edit
              </button>
            </Link>
            <form action={handleDeleteSnippet}>
              {/* <FaTrash cursor={"pointer"} /> */}
              <button className="border py-1 font-medium px-4 rounded-md text-xs bg-red-400 text-white">
                Delete
              </button>
            </form>
          </div>
        </div>
        <pre className="p-2 rounded-md bg-gray-300">
          <code>{snippet?.code}</code>
        </pre>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
