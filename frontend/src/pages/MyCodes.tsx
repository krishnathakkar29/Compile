import CodeItem from "@/components/CodeItem";
import { useGetAllCodesQuery } from "@/redux/slices/api";

const AllCodes = () => {
  const { data: allCodes } = useGetAllCodesQuery();
  console.log(allCodes);

  return (
    <div className="border-2 p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
      {allCodes?.length != 0 ? (
        allCodes?.map((item) => {
          return <CodeItem deleteBtn={false} key={item._id} data={item} />;
        })
      ) : (
        <p className=" block w-full text-center font-mono text-slate-500 p-4">
          No Codes Found
        </p>
      )}
    </div>
  );
};

export default AllCodes;
