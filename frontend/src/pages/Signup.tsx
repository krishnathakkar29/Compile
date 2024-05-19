import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "./PageStyles/grid.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";
import { useDispatch } from "react-redux";

//define the schema , for the fiel you eed in the field
const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const Signup = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [signup , {isLoading}] = useSignupMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUp(values: z.infer<typeof formSchema>) {
    try {
      const response  = await signup(values).unwrap() 
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <div className="signup grid-bg w-full h-[calc(100vh-60px)] flex items-center justify-center flex-col gap-2">
      <div className="form_container bg-black border-[1px] py-8 px-4 flex flex-col gap-5 min-w-[300px]">
        <div>
          <h1 className="text-4xl font-bold text-left font-mono">Signup</h1>
          <p className="font-mono text-xs">Join the Developer's  Community 👩‍💻.</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isLoading} type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isLoading} className="w-full" type="submit">
              Signup
            </Button>
          </form>
        </Form>
        <small>Already have an account? <Link to='/login' className="text-blue-500">Login</Link></small>
      </div>
    </div>
  );
};

export default Signup;
