import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Icons } from "@/constants/Icons";
import { Input } from "@/components/ui/input";
import { LucideUserPlus2 } from "lucide-react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const form = useForm();
  const navigate = useNavigate();

  const handleSubmit = (credentials) => {
    setLoading(true);
    registerUser(credentials, {
      onSuccess: (data) => {
        setLoading(false);
        navigate(`/dashboard/${data?.user?.role}`);
      },
      onError: (error) => {
        setLoading(false);
        console.log(error);
      },
    }); // on save button press send data to the apis
  };

  return (
    <div className="mx-auto relative flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col w-full items-center justify-stretch space-y-2 text-center">
        <LucideUserPlus2 size={50} className="" />
        <h1 className="text-2xl font-grotesk font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm font-grotesk font-medium tracking-normal text-muted-foreground">
          Enter your email below to create your account
        </p>
        <div className="grid w-full gap-6">
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
                          className=""
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
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="password"
                          autoCorrect="off"
                          disabled={loading}
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
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="password"
                          autoCorrect="off"
                          disabled={loading}
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={loading}>
                  {loading && (
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
          <Button variant="outline" type="button" disabled={loading}>
            {loading ? (
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

export default Register;
