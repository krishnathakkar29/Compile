import CodeItem from "@/components/CodeItem";
import { useGetAllCodesQuery } from "@/redux/slices/api";

const AllCodes = () => {
  const { data: allCodes } = useGetAllCodesQuery();
  console.log(allCodes);
  return (
    <div className="grid grid-cols-[repeat(auto-fill, minmax(250px , 1fr))] gap-3 p-3">
      {allCodes?.length != 0 ? (
        allCodes?.map((item) => {
          return <CodeItem deleteBtn={false} key={item._id} data={item} />;
        })
      ) : (
        <>No Codes Found</>
      )}
    </div>
  );
};

export default AllCodes;
