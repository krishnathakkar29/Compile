import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { Save, Share2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { handleError } from "@/utils/handleError";
import axios from "axios";

const HelperHeader = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  const fullCode = useSelector((state:RootState) => state.compilerSlice.fullCode)

  const handleSaveCode =async () => {
    try {
      const response = await axios.post("http://localhost:3000/compiler/save", {
        fullCode:fullCode
      })
      console.log(response.data)
    } catch (error) {
      handleError(error)
      
    }
  }

  return (
    <div className="helper-header h-[50px] bg-black text-white p-2 flex items-center justify-between">
      <div className="btn-container flex gap-1">
        <Button
          variant="success"
          className="flex justify-center items-center gap-1"
          onClick={handleSaveCode}
        >
          {" "}
          <Save size={16} /> Save
        </Button>

        <Button
          variant="secondary"
          className="flex justify-center items-center gap-1"
        >
          <Share2 size={16} />
          Share
        </Button>
      </div>

      <div className="tab-switcher flex justify-center items-center">
        <small>Current Language: &nbsp; </small>
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) =>
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              ) //13100 typcaasting that value can be either of the interface of current language
            )
          }
        >
          <SelectTrigger className="w-[120px] bg-gray-800 focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">JavaSript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HelperHeader;
