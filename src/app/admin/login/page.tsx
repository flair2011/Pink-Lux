"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { createSession } from "@/app/actions/adminActions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      
      const response = await createSession(idToken);
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
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          
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
