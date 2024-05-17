import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
}

const initialState: CompilerSliceStateType = {
  fullCode: {
    html: `
<html lang="en">
  <body>
    <div class="container">
        <h1>Welcome to the Color Changer</h1>
        <button id="colorButton">Change Background Color</button>
    </div>
    <script src="script.js"></script>
  </body>
</html>

    `,
    css: "",
    javascript: "",
  },
  currentLanguage: "html",
};

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (
      state,
      action: PayloadAction<CompilerSliceStateType["currentLanguage"]>
    ) => {
      state.currentLanguage = action.payload;
    },
    updateCodeValue: (state, action: PayloadAction<string>) => {
      state.fullCode[state.currentLanguage] = action.payload
    },
  },
});

export default compilerSlice.reducer;

export const { updateCurrentLanguage, updateCodeValue } = compilerSlice.actions;
