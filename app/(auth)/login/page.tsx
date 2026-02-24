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

export default function SignupPage() {
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
      if (error?.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]) => {
            setError(field as keyof LoginUser, {
              type: "server",
              message: message as string,
            });
          },
        );
      }
    },
    onSuccess: () => {
      toast("Signup successful", { position: "bottom-right" });
      router.push("/");
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                className="h-12 px-4"
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
                className="h-12 px-4"
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
