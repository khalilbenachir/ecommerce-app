import { PlusCircle } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface IPage {
  params: {
    billboardId: string;
  };
}

const Page: React.FC<IPage> = ({ params }) => {
  return (
    <main className="flex flex-col">
      <div className="flex justify-between items-center p-8 pt-6">
        <Heading
          title="Billboards (0)"
          description="manage billboards for your store."
        />
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add new billboard
        </Button>
      </div>
      <Separator />
    </main>
  );
};

export default Page;
