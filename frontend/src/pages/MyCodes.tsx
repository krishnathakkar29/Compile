import CodeItem from "@/components/CodeItem";
import { useGetMyCodesQuery } from "@/redux/slices/api";

const MyCodes = () => {
  const { data: myCodes, isSuccess, isLoading } = useGetMyCodesQuery();

  return myCodes?.length != 0 ? (
    <>
      <div className="border-2 p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 ">
        {myCodes?.map((item) => {
          return <CodeItem key={item._id} data={item} />;
        })}
      </div>
    </>
  ) : (
    <>
      <p className="text-center font-mono text-slate-600 p-4">
        You Don't Have Any Saved Codes 😔
      </p>
    </>
  );
};
export default MyCodes;
