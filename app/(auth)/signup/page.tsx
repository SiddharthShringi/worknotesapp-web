"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signup } from "@/lib/api/auth.api";
import { SignupParams } from "@/types/auth.types";
import { useAuth } from "@/lib/context/AuthContext";
import { handleStoreToken } from "@/lib/utils/handleAuthSuccess";
import { signupSchema, SignupFormData } from "@/lib/validations/auth.schema";
import { mapErrors, ErrorResponse } from "@/lib/api/errorMapping";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";

export default function SignupPage() {
  const router = useRouter();
  const { storeToken } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: signup,
    onError: (error: AxiosError<ErrorResponse>) => {
      const message = mapErrors<SignupFormData>(error, setError);
      toast.error(message || "Signup failed. Please try again.");
    },
    onSuccess: (response) => {
      handleStoreToken(response, storeToken);
      toast.success("Signup successful");
      router.replace("/");
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
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
    <AuthCard
      title="Sign Up"
      description="Create an account and start showing up for yourself."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          label="First Name"
          id="firstName"
          registration={register("firstName")}
          error={errors.firstName?.message}
        />
        <FormField
          label="Last Name"
          id="lastName"
          registration={register("lastName")}
          error={errors.lastName?.message}
        />
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
        <FormField
          label="Confirm Password"
          id="passwordConfirmation"
          type="password"
          registration={register("passwordConfirmation")}
          error={errors.passwordConfirmation?.message}
        />
        <Button type="submit" className="w-full h-12">
          {mutation.isPending ? "Signing up" : "Register"}
        </Button>
        <div className="flex items-center justify-center text-xs">
          <p className="pr-1">Already Have an Account?</p>
          <Link href="/login" className="text-brand-blue underline font-bold">
            Sign In
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
