import React from "react";

import prismaDb from "@/lib/prismadb";
import FormSettings from "./components/Form";

interface IPage {
  params: {
    billboardId: string;
  };
}

const Page: React.FC<IPage> = async ({ params }) => {
  const billboard = await prismaDb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <main className="flex flex-col p-6">
       <FormSettings initialData={billboard} />
    </main>
  );
};

export default Page;
