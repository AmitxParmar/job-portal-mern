import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/constants/Icons";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const form = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mutate: loginUser, isLoading } = login;

  const handleSubmit = (credentials) => {
    loginUser(credentials, {
      onSuccess: (data) => {
        toast.success("Login Success!");
        navigate(`/dashboard/${data?.user?.role}`);
      },
      onError: (error) => {
        toast.error("onErrror:loginmutate", { description: error.message });
      },
    }); // on save button press send data to the apis
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl flex items-center justify-center gap-4 font-grotesk font-semibold tracking-tight">
          <span>Login to account </span>
          <KeyRound />
          {/* <LogInIcon /> */}
        </h1>
        <p className="text-sm font-grotesk font-medium tracking-normal text-muted-foreground">
          Enter your email and password below to login to your account
        </p>
        <div className={"grid gap-6"}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@example.com"
                          {...field}
                          value={field.value || ""}
                        />
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
                      <FormLabel className="sr-only">Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="password"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In with Email
                </Button>
              </div>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
