import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CompilerSliceStateType {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
  currentLanguage: "html" | "css" | "javascript";
  isOwner: boolean;
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
    css: `
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f0f0f0;
  }
  
  .container {
      text-align: center;
  }
  
  button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 5px;
  }
  
  button:hover {
      background-color: #0056b3;
  }
    `,
    javascript: `
    document.getElementById('colorButton').addEventListener('click', function() {
      const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.style.backgroundColor = randomColor;
  });
    `,
  },
  currentLanguage: "html",
  isOwner: false,
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
      state.fullCode[state.currentLanguage] = action.payload;
    },
    updateFullCode: (
      state,
      action: PayloadAction<CompilerSliceStateType["fullCode"]>
    ) => {
      state.fullCode = action.payload;
    },
    updateIsOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload;
    },
  },
});

export default compilerSlice.reducer;

export const {
  updateCurrentLanguage,
  updateCodeValue,
  updateFullCode,
  updateIsOwner,
} = compilerSlice.actions;
