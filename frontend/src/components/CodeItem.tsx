import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDeleteCodeMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";
import { codeType } from "@/vite-env";
import { Code, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const CodeItem = ({
  data,
  deleteBtn,
}: {
  data: codeType;
  deleteBtn: boolean;
}) => {
  const [deleteCode, { isLoading }] = useDeleteCodeMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteCode(data._id!).unwrap();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className=" p-3 cursor-pointer bg-slate-800 flex items-center justify-center gap-2 flex-col">
      <div className="top flex justify-center items-center gap-3">
        <Code />
        <p className="font-mono font-bold text-lg text-white">{data.title}</p>
      </div>
      <Separator />

      <div className="btn_container flex gap-3">
        <Link target="_blank" to={`/compiler/${data._id}`}>
          <Button variant="secondary">Open Code</Button>
        </Link>
        {deleteBtn && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                // onClick={handleSaveCode}
                disabled={false}
              >
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-1 items-center justify-center">
                  {" "}
                  <Trash2 /> Delete Code Confirmation
                </DialogTitle>
                {/* <DialogDescription className="flex flex-col gap-2"> */}
                <div className="flex gap-2 items-center justify-center flex-col ">
                  <p>Are you sure , that you want to delete this code? </p>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="h-full"
                    loading={isLoading}
                  >
                    Confirm Delete
                  </Button>
                </div>
                {/* </DialogDescription> */}
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default CodeItem;
