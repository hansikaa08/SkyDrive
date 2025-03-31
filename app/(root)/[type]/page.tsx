import React from "react";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";
import { getFileTypesParams } from "@/lib/utils";
// import sort from "@/components/Sort";

// const usageSummary = getUsageSummary(totalSpace);

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const files = await getFiles({ types: types, searchText, sort });
  return (
    <div className={"page-container"}>
      <section className={"w-full total-size-section"}>
        <h1 className={"h1 capitalize"}>{type}</h1>
        <div className={"total-size-section"}>
          {/*<p className={"body-1"}>*/}
          {/*  Total: <span className={"h5"}>0MB</span>*/}
          {/*</p>*/}
          <div className={"sort-container"}>
            <p className={"body-1 hidden sm:block text-light-200"}>Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {/*    render the files*/}
      {files.total > 0 ? (
        <section className={"file-list"}>
          {files.documents.map((file: Models.Document) => (
            // <h1 key={{file.$id} className={"h1"}}>{file.name}</h1>
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className={"empty-list"}>No files uploaded.</p>
      )}
    </div>
  );
};

export default Page;
