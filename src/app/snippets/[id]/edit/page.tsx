import { EditSnippet } from "@/actions";
import { db } from "@/app/db";
import SnippetEditForm from "@/components/SnippetEditForm";
import { notFound } from "next/navigation";

interface EditPropsInterface {
  params: {
    id: string;
  };
}
export default async function EditPage(props: EditPropsInterface) {
  let id = parseInt(props.params.id);
  const snippet = await db.snippet.findFirst({
    where: {
      id,
    },
  });
  console.log(snippet);

  if (!snippet) {
    return notFound();
  }
  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
