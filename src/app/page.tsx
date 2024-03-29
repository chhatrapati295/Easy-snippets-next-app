import Link from "next/link";
import { db } from "./db";
import { IoIosHome } from "react-icons/io";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  const getSnippetData = snippets?.map((item, i) => {
    return (
      <div key={i} className="flex flex-col">
        <div className="flex justify-between items-center text-gray-500">
          <h2 className="font-medium">{item?.id + ". " + item?.title}</h2>
          <Link
            className="text-xs font-semibold border rounded-md  active:scale-95 hover:bg-blue-500 py-1 px-3 bg-blue-600 text-white"
            href={`/snippets/${item.id}`}
          >
            View
          </Link>
        </div>
        {/* <pre>
          <code>{item?.code}</code>
        </pre> */}
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl flex items-center gap-2">
          <IoIosHome color="blue" />
          Home Page
        </h2>
        <Link
          href={"/snippets/create"}
          className="border py-2 w-fit text-xs font-semibold text-white bg-green-500 rounded-md px-2  "
        >
          Create Snippets
        </Link>
      </div>
      <div className="border border-black p-2 rounded-md flex flex-col gap-4">
        <h2 className="font-bold text-2xl text-center">Snippets List</h2>
        <div className="flex flex-col gap-3 p-2">{getSnippetData}</div>
      </div>
    </div>
  );
}
