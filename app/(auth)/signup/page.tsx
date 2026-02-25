"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signup } from "@/lib/api/auth.api";
import { SignupParams, SignupUser } from "@/types/auth.types";
import { useAuth } from "@/lib/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { storeToken } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupUser>();

  const mutation = useMutation({
    mutationFn: signup,
    onError: (error: any) => {
      if (error?.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]) => {
            setError(field as keyof SignupUser, {
              type: "server",
              message: message as string,
            });
          },
        );
      }
    },
    onSuccess: (response) => {
      const authHeader = response.headers["authorization"] as string;

      if (authHeader) {
        const token = authHeader.split(" ")[1];
        storeToken(token);
      }
      toast.success("Signup successful");
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<SignupUser> = (data) => {
    const payload: SignupParams = {
      user: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      },
    };

    mutation.mutate(payload);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-lg 2xl:max-w-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
          <CardDescription>
            Create an account and start showing up for yourself.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="name" className="text-xs">
                First Name
              </Label>
              <Input
                {...register("firstName")}
                className="py-5"
                id="firstName"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="name" className="text-xs">
                Last Name
              </Label>
              <Input {...register("lastName")} className="py-5" id="lastName" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                className="py-5"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
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

            <div className="space-y-2">
              <Label htmlFor="passwordConfirmation" className="text-xs">
                Confirm Password
              </Label>
              <Input
                {...register("passwordConfirmation", {
                  required: true,
                })}
                className="py-5"
                id="passwordConfirmation"
                type="password"
              />
              {errors.passwordConfirmation && (
                <div className="text-destructive text-sm">
                  {errors.passwordConfirmation.message}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full h-12">
              Register
            </Button>
            <div className="flex items-center justify-center text-xs">
              <p className="pr-1">Already Have an Account?</p>
              <Link
                href="/login"
                className="text-brand-blue underline font-bold"
              >
                Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
