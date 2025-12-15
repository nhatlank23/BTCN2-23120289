import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const loginSchema = z.object({
  username: z.string().min(1, "Vui lòng nhập username"),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    setError("");
    
    try {
      const result = await login(values.username, values.password);
      console.log('Login result:', result);
      
      if (result.success) {
        console.log('Login successful, navigating to home...');
        navigate("/", { replace: true });
      } else {
        setError(result.error || "Sai tài khoản hoặc mật khẩu!");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại!");
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-900">
      <Card className="w-[450px] shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
            <Link to="/register" className="text-sm text-blue-500 font-medium hover:underline">
              Đăng ký
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input placeholder="Nhập username" {...field} className="h-11 bg-slate-50 dark:bg-gray-800" />
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
                    <FormLabel className="font-bold text-gray-700 dark:text-gray-300">Mật khẩu</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} className="h-11 bg-slate-50 dark:bg-gray-800" />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-lg font-medium disabled:opacity-50"
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}