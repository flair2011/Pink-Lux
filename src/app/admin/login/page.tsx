"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { createSession } from "@/app/actions/adminActions";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      const response = await createSession(idToken, rememberMe);
      if (response.success) {
        // Force refresh allowing middleware to recognize session cookie state immediately.
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(response.error || "Login backend verification failed");
      }
    } catch (error: unknown) {
      console.error(error);
      setErrorMsg("Invalid credentials or Firebase is not configured properly in .env.local.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-surface-container-lowest p-8 rounded-[2rem] editorial-shadow">
        <h1 className="text-3xl font-headline italic text-primary text-center mb-6">Staff Access</h1>
        
        {errorMsg && (
          <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-xl p-4 pr-12 focus:ring-2 focus:ring-primary/20 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-on-surface-variant hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 ml-1 text-sm font-medium cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded accent-primary"
            />
            Remember me
          </label>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-primary text-on-primary py-4 rounded-full font-bold editorial-shadow hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-6"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}
