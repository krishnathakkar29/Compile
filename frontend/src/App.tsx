import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appSlice";
import { Loader } from "lucide-react";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Compile = lazy(() => import("./pages/Compile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AllCodes = lazy(() => import("./pages/AllCodes"));
const MyCodes = lazy(() => import("./pages/MyCodes"));

//react split
function App() {
  const { data, error } = useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    } else if (error) {
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }
  }, [data, error]);
  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />

        <Suspense
          fallback={
            <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compiler/:urlId?" element={<Compile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/all-codes" element={<AllCodes />} />
            <Route path="/my-codes" element={<MyCodes />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
