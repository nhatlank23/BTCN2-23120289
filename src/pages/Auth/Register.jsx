import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().min(1, "Please enter email").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm password"),
  phone: z.string().optional(),
  dob: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { 
      username: "", 
      email: "", 
      password: "", 
      confirmPassword: "",
      phone: "",
      dob: ""
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await register(
        values.username, 
        values.email, 
        values.password,
        values.phone,
        values.dob
      );
      
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error || "Registration failed!");
      }
    } catch (err) {
      setError("An error occurred. Please try again!");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-900">
      <Card className="w-[450px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold dark:text-white">Register</CardTitle>
          <CardDescription className="mt-1 text-gray-600 dark:text-gray-300">
            Create a new account to access all features.{' '}

          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}
              
              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700 dark:text-gray-300">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} className="h-11 bg-slate-50 dark:bg-gray-800" />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700 dark:text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} className="h-11 bg-slate-50 dark:bg-gray-800" />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700 dark:text-gray-300">Phone (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="0123456789" {...field} className="h-11 bg-slate-50 dark:bg-gray-800" />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700 dark:text-gray-300">Date of Birth (optional)</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="h-11 bg-slate-50 dark:bg-gray-800" />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700 dark:text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} className="h-11 bg-slate-50 dark:bg-gray-800" />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700 dark:text-gray-300">Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Re-enter password" {...field} className="h-11 bg-slate-50 dark:bg-gray-800" />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-lg mt-2 disabled:opacity-50"
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <Link to="/login" className="text-blue-500 font-medium hover:underline text-end mx-8 ">
              Login
        </Link>
      </Card>
    </div>
  );
}
