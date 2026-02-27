"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoginParams } from "@/types/auth.types";
import { login } from "@/lib/api/auth.api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { handleStoreToken } from "@/lib/utils/handleAuthSuccess";
import { loginSchema, LoginFormData } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { mapErrors, ErrorResponse } from "@/lib/api/errorMapping";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";

export default function LoginPage() {
  const { storeToken } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = mapErrors<LoginFormData>(error, setError);
      toast.error(message || "Login failed. Please try again.");
    },
    onSuccess: (response) => {
      handleStoreToken(response, storeToken);
      toast.success("Login successful");
      router.replace("/");
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    const payload: LoginParams = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    mutation.mutate(payload);
  };

  return (
    <AuthCard
      title="Sign In"
      description="Sign in to your account and start showing up for yourself."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          label="Email"
          id="email"
          type="email"
          registration={register("email")}
          error={errors.email?.message}
        />
        <FormField
          label="Password"
          id="password"
          type="password"
          registration={register("password")}
          error={errors.password?.message}
        />
        <Button type="submit" className="w-full h-12">
          Sign In
        </Button>
        <div className="flex items-center justify-center text-xs">
          <p className="pr-1">Don&apos;t Have an Account?</p>
          <Link href="/signup" className="text-brand-blue underline font-bold">
            Register
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
