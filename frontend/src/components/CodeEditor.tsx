import CodeMirror from "@uiw/react-codemirror";
import React from "react";
// import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";
import {
    loadLanguage
} from "@uiw/codemirror-extensions-langs";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CodeEditor = () => {
  const currentLanguage = useSelector((state:RootState) => state.compilerSlice.currentLanguage)
  
  const [value, setValue] = React.useState("console.log('hello world!');");
  
  
  const onChange = React.useCallback((val: any) => {
    console.log("val:", val);
    setValue(val);
  }, []);


  return (
    <CodeMirror
      value={value}
      height="100vh"
      extensions={[loadLanguage(currentLanguage)!]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
};

export default CodeEditor;
