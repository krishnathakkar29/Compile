import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditCodeMutation, useSaveCodeMutation } from "@/redux/slices/api";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";
import { handleError } from "@/utils/handleError";
import {
  Code,
  Copy,
  Download,
  Loader2,
  PencilLine,
  Save,
  Share2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HelperHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { urlId } = useParams();

  const [shareBtn, setShareBtn] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("My Code");

  const isOwner = useSelector(
    (state: RootState) => state.compilerSlice.isOwner
  );

  useEffect(() => {
    if (urlId) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
  }, [urlId]);
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );

  const fullCode = useSelector(
    (state: RootState) => state.compilerSlice.fullCode
  );

  const [saveCode, { isLoading }] = useSaveCodeMutation();
  const [editCode, { isLoading: codeEditLoading }] = useEditCodeMutation();

  const handleSaveCode = async () => {
    try {
      const response = await saveCode({
        fullCode: fullCode,
        title: title,
      }).unwrap();
      navigate(`/compiler/${response.url}`, { replace: true });
    } catch (error) {
      handleError(error);
    }
  };

  const handleDownloadCode = () => {
    if (
      fullCode.html == "" &&
      fullCode.css == "" &&
      fullCode.javascript == ""
    ) {
      toast("Error: Code is Empty!");
    } else {
      const htmlCode = new Blob([fullCode.html], { type: "text/html" });
      const cssCode = new Blob([fullCode.css], { type: "text/css" });
      const javascriptCode = new Blob([fullCode.javascript], {
        type: "text/javascript",
      });

      const htmlLink = document.createElement("a");
      const cssLink = document.createElement("a");
      const javascriptLink = document.createElement("a");

      htmlLink.href = URL.createObjectURL(htmlCode);
      htmlLink.download = "index.html";
      document.body.appendChild(htmlLink);

      cssLink.href = URL.createObjectURL(cssCode);
      cssLink.download = "style.css";
      document.body.appendChild(cssLink);

      javascriptLink.href = URL.createObjectURL(javascriptCode);
      javascriptLink.download = "script.js";
      document.body.appendChild(javascriptLink);

      if (
        fullCode.html == "" &&
        fullCode.css == "" &&
        fullCode.javascript == ""
      ) {
        toast("Error: Code is Empty!");
      }

      if (fullCode.html !== "") {
        htmlLink.click();
      }
      if (fullCode.css !== "") {
        cssLink.click();
      }
      if (fullCode.javascript !== "") {
        javascriptLink.click();
      }

      document.body.removeChild(htmlLink);
      document.body.removeChild(cssLink);
      document.body.removeChild(javascriptLink);

      toast("Code Downloaded Successfully");
    }
  };

  const handleEditCode = async () => {
    try {
      if (urlId) {
        await editCode({ fullCode, id: urlId }).unwrap();
        toast("Code updated successfully");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="helper-header h-[50px] bg-black text-white p-2 flex items-center justify-between">
      <div className="btn-container flex gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="success"
              // onClick={handleSaveCode}
              disabled={isLoading}
            >
              {" "}
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={16} /> Save
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-1 items-center justify-center">
                {" "}
                <Code /> Save Your Code!
              </DialogTitle>
              <DialogDescription className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <Input
                    className="bg-slate-700 focus-visible:ring-0"
                    placeholder="Type your code title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Button
                    variant="success"
                    onClick={handleSaveCode}
                    className="h-full"
                  >
                    Save
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button onClick={handleDownloadCode} size="icon" variant="blue">
          <Download size={"16"} />{" "}
        </Button>

        {shareBtn && (
          <>
            {isOwner && (
              <Button
                size="icon"
                onClick={handleEditCode}
                loading={codeEditLoading}
                variant="blue"
              >
                <PencilLine size={"16"} /> Edit
              </Button>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">
                  <Share2 size={16} />
                  {/* Share */}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex gap-1 items-center justify-center">
                    {" "}
                    <Code /> Share your Code!
                  </DialogTitle>
                  <DialogDescription className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <input
                        type="text"
                        disabled
                        className="w-full px-2 py-2 text-slate-400 rounded-md bg-slate-800"
                        value={window.location.href}
                      />
                      <Button variant="outline">
                        <Copy
                          size={14}
                          onClick={() => {
                            window.navigator.clipboard.writeText(
                              window.location.href
                            );
                            toast("URL Copied");
                          }}
                        />
                      </Button>
                    </div>
                    <p className="text-center">Share this URL to collborate</p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
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
