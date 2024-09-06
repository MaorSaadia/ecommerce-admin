import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: { billboardsId: string };
}) => {
  // Check if the billboardsId is "new", in which case, skip fetching from the database
  if (params.billboardsId === "new") {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardForm initialData={null} />
        </div>
      </div>
    );
  }

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardsId,
    },
  });

  if (!billboard) {
    return <div>Billboard not found.</div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
