"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";


const loginSchema = z.object({
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits" }).nonempty("Phone number is required"),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).nonempty("Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (data: LoginFormValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="px-4">
        <div className="flex flex-col items-center mt-20 w-full max-w-md mx-auto p-6 border border-pink-600 rounded-lg shadow-lg bg-pink-50">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col  items-center space-y-4">
          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                  className="w-80"
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                  className="w-80"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-80 bg-pink-600 hover:bg-pink-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
    </div>
  );
};

export default LoginForm;
