import CodeEditor from "@/components/CodeEditor";
import HelperHeader from "@/components/HelperHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const Compile = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]" defaultSize={50}>
        <HelperHeader />
        <CodeEditor/>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel className="h-[calc(100vh-60px)] min-w-[350px]" defaultSize={50}>Right Side</ResizablePanel>
    
    </ResizablePanelGroup>
  );
};

export default Compile;
