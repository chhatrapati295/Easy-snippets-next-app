"use client";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetProp {
  snippet: Snippet;
}
const SnippetEditForm = ({ snippet }: SnippetProp) => {
  const [code, setCode] = useState(snippet.code);
  function handleEditorChange(value: string = "") {
    console.log("here is the current model value:", value);
    setCode(value);
    console.log(value);
  }

  const editSnippetAction = actions.EditSnippet.bind(null, snippet.id, code);

  return (
    <div className="py-2 flex flex-col gap-2">
      <form
        action={editSnippetAction}
        className="flex justify-between items-center"
      >
        <h2 className=" text-gray-500 font-medium">
          You are editing <span className="underline">{snippet.title}</span>
        </h2>
        <button
          type="submit"
          className="border p-2 px-4 bg-green-400 text-white text-xs rounded-md "
        >
          Save
        </button>
      </form>
      <Editor
        height="40vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default SnippetEditForm;
