"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoginUser, LoginParams } from "@/types/auth.types";
import { login } from "@/lib/api/auth.api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

export default function LoginPage() {
  const { storeToken } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginUser>();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onError: (error: any) => {
      const errorData = error.response?.data;

      if (error.response?.status === 401) {
        const message = errorData?.error || "Invalid email or password";
        toast.error(message);

        // Set form errors so the fields highlight red
        setError("email", { type: "server", message: "" });
        setError("password", { type: "server", message: message });
        return;
      }
    },
    onSuccess: (response) => {
      const authHeader = response.headers["authorization"] as string;

      if (authHeader) {
        const token = authHeader.split(" ")[1];
        storeToken(token);
      }
      toast.success("Login successful");
      router.replace("/");
    },
  });

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    const payload: LoginParams = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    mutation.mutate(payload);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-lg 2xl:max-w-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Sign In</CardTitle>
          <CardDescription>
            Sign in to your account and start showing up for yourself.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="py-5"
                id="email"
                type="email"
              />
              {errors.email && (
                <div className="text-destructive text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                className="py-5"
                id="password"
                type="password"
              />
              {errors.password && (
                <div className="text-destructive text-sm">
                  {errors.password.message}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full h-12">
              Sign In
            </Button>
            <div className="flex items-center justify-center text-xs">
              <p className="pr-1">Don&apos;t Have an Account?</p>
              <Link
                href="/signup"
                className="text-brand-blue underline font-bold"
              >
                Register
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
