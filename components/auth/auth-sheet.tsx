"use client";

import { useState } from "react";
import Link from "next/link";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { BrandStripe } from "@/components/hub/brand-stripe";
import { OAuthGrid } from "@/components/auth/oauth-grid";
import { VerificationCodeInput } from "@/components/auth/verification-code-input";
import {
  loginSchema,
  signupSchema,
  type LoginFormData,
  type SignupFormData,
} from "@/lib/validations";
import { getFriendlyError } from "@/lib/errors";

type AuthView = "login" | "signup" | "forgot" | "verification";

interface AuthSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: Extract<AuthView, "login" | "signup">;
}

export function AuthSheet({ open, onOpenChange, initialView = "login" }: AuthSheetProps) {
  const { signIn, isLoaded: signInLoaded, setActive: setSignInActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive: setSignUpActive } = useSignUp();
  const [view, setView] = useState<AuthView>(initialView);
  const [verifyingFor, setVerifyingFor] = useState<"login" | "signup">("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "microsoft" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const activateSession = async (sessionId?: string | null) => {
    const setActive = setSignInActive ?? setSignUpActive;
    if (!sessionId || !setActive) {
      window.location.reload();
      return;
    }
    await setActive({ session: sessionId });
    onOpenChange(false);
    window.location.reload();
  };

  const handleOAuth = async (strategy: "oauth_google" | "oauth_microsoft") => {
    if (!signInLoaded) return;
    const provider = strategy === "oauth_google" ? "google" : "microsoft";
    setOauthLoading(provider);
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/auth-redirect",
      });
    } catch (error) {
      const { message } = getFriendlyError(error);
      toast.error(message);
      setOauthLoading(null);
    }
  };

  const handleLogin = async (data: LoginFormData) => {
    if (!signInLoaded) return;
    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });
      if (result.status === "needs_second_factor") {
        await signIn.prepareSecondFactor({ strategy: "email_code" });
        setVerifyingFor("login");
        setView("verification");
        toast.info("Check your email for a verification code.");
      } else if (result.status === "complete") {
        toast.success("Welcome back!");
        await activateSession(result.createdSessionId);
      }
    } catch (error) {
      const { message } = getFriendlyError(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!signUpLoaded) return;
    const email = signupForm.getValues("email");
    const password = signupForm.getValues("password");
    if (!firstName || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);
    try {
      await signUp.create({
        firstName,
        lastName: lastName || undefined,
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifyingFor("signup");
      setView("verification");
      toast.info("Check your email for a verification code.");
    } catch (error) {
      const { message } = getFriendlyError(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (code: string) => {
    setIsLoading(true);
    try {
      if (verifyingFor === "signup" && signUpLoaded) {
        const result = await signUp.attemptEmailAddressVerification({ code });
        if (result.status === "complete") {
          toast.success("Account created. Welcome to Operavax!");
          await activateSession(result.createdSessionId);
        }
      } else if (verifyingFor === "login" && signInLoaded) {
        const result = await signIn.attemptSecondFactor({ strategy: "email_code", code });
        if (result.status === "complete") {
          toast.success("Welcome back!");
          await activateSession(result.createdSessionId);
        }
      }
    } catch (error) {
      const { message } = getFriendlyError(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!signInLoaded || !forgotEmail.trim()) return;
    setIsLoading(true);
    try {
      await signIn.create({ strategy: "reset_password_email_code", identifier: forgotEmail });
      toast.success("Password reset link sent to your email.");
    } catch (error) {
      const { message } = getFriendlyError(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
      />

      {/* Centered popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-[480px] max-h-[90vh] rounded-[28px] border border-[#E2E8F0] bg-white shadow-2xl overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          <BrandStripe />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#eee] shrink-0">
            <h2 className="font-display text-xl font-bold tracking-tight text-[#222]">
              {view === "login" ? "Sign In" : view === "signup" ? "Sign Up" : view === "forgot" ? "Reset Password" : "Verification"}
            </h2>
            <button
              onClick={() => onOpenChange(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#aaa] transition-colors hover:bg-[#f5f5f5] hover:text-[#222]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Scrollable form content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="wait">
            {/* ── SIGN IN ── */}
            {view === "login" && (
              <motion.div key="login" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <p className="text-sm text-[#6a6a6a] mb-5">Enter your email and password to sign in!</p>
                <OAuthGrid onOAuth={handleOAuth} oauthLoading={oauthLoading} label="Sign in with" />
                <div className="my-5 flex items-center gap-4"><div className="h-px flex-1 bg-[#E2E8F0]" /><span className="text-sm text-[#6a6a6a]">Or</span><div className="h-px flex-1 bg-[#E2E8F0]" /></div>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1C2434]">Email <span className="text-[#DB4437]">*</span></label>
                    <Input type="email" placeholder="info@gmail.com" className="h-[46px] border-[#E2E8F0] bg-transparent text-sm placeholder:text-[#AEB7C0] focus-visible:ring-[#4285F4]/30 focus-visible:border-[#4285F4]" disabled={isLoading} {...loginForm.register("email")} />
                    {loginForm.formState.errors.email && <p className="mt-1.5 text-xs text-[#DB4437]">{loginForm.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1C2434]">Password <span className="text-[#DB4437]">*</span></label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="h-[46px] border-[#E2E8F0] bg-transparent pr-10 text-sm placeholder:text-[#AEB7C0] focus-visible:ring-[#4285F4]/30 focus-visible:border-[#4285F4]" disabled={isLoading} {...loginForm.register("password")} />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#AEB7C0] hover:text-[#1C2434] transition-colors" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && <p className="mt-1.5 text-xs text-[#DB4437]">{loginForm.formState.errors.password.message}</p>}
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)} className="h-4 w-4 rounded border-[#E2E8F0] text-[#4285F4] focus:ring-[#4285F4]/30" /><span className="text-sm text-[#6a6a6a]">Keep me logged in</span></label>
                    <button type="button" onClick={() => setView("forgot")} className="text-sm text-[#4285F4] hover:underline py-1">Forgot password?</button>
                  </div>
                  <div id="clerk-captcha" />
                  <button type="submit" disabled={isLoading} className="flex h-[46px] w-full items-center justify-center rounded-lg bg-[#4285F4] font-display text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#3367D6] disabled:opacity-60">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign in
                  </button>
                </form>
                <p className="mt-5 text-sm text-[#6a6a6a]">Don&apos;t have an account? <button onClick={() => setView("signup")} className="font-medium text-[#4285F4] hover:underline">Sign Up</button></p>
              </motion.div>
            )}

            {/* ── SIGN UP ── */}
            {view === "signup" && (
              <motion.div key="signup" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <p className="text-sm text-[#6a6a6a] mb-5">Enter your details to create an account!</p>
                <OAuthGrid onOAuth={handleOAuth} oauthLoading={oauthLoading} label="Sign up with" />
                <div className="my-5 flex items-center gap-4"><div className="h-px flex-1 bg-[#E2E8F0]" /><span className="text-sm text-[#6a6a6a]">Or</span><div className="h-px flex-1 bg-[#E2E8F0]" /></div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#1C2434]">First Name <span className="text-[#DB4437]">*</span></label>
                      <Input type="text" placeholder="First name" className="h-[46px] border-[#E2E8F0] bg-transparent text-sm placeholder:text-[#AEB7C0] focus-visible:ring-[#4285F4]/30 focus-visible:border-[#4285F4]" disabled={isLoading} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#1C2434]">Last Name</label>
                      <Input type="text" placeholder="Last name" className="h-[46px] border-[#E2E8F0] bg-transparent text-sm placeholder:text-[#AEB7C0] focus-visible:ring-[#4285F4]/30 focus-visible:border-[#4285F4]" disabled={isLoading} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1C2434]">Email <span className="text-[#DB4437]">*</span></label>
                    <Input type="email" placeholder="Enter your email" className="h-[46px] border-[#E2E8F0] bg-transparent text-sm placeholder:text-[#AEB7C0] focus-visible:ring-[#4285F4]/30 focus-visible:border-[#4285F4]" disabled={isLoading} {...signupForm.register("email")} />
                    {signupForm.formState.errors.email && <p className="mt-1.5 text-xs text-[#DB4437]">{signupForm.formState.errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1C2434]">Password <span className="text-[#DB4437]">*</span></label>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="h-[46px] border-[#E2E8F0] bg-transparent pr-10 text-sm placeholder:text-[#AEB7C0] focus-visible:ring-[#4285F4]/30 focus-visible:border-[#4285F4]" disabled={isLoading} {...signupForm.register("password")} />
                      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#AEB7C0] hover:text-[#1C2434] transition-colors" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                      </button>
                    </div>
                    {signupForm.formState.errors.password && <p className="mt-1.5 text-xs text-[#DB4437]">{signupForm.formState.errors.password.message}</p>}
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded border-[#E2E8F0] text-[#4285F4] focus:ring-[#4285F4]/30" />
                    <span className="text-sm leading-relaxed text-[#6a6a6a]">
                      By creating an account means you agree to the{" "}
                      <Link href="/terms" className="font-medium text-[#4285F4] hover:underline">Terms and Conditions</Link>
                      , and our{" "}
                      <Link href="/privacy" className="font-medium text-[#4285F4] hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                  <button type="button" disabled={isLoading || !agreedToTerms} onClick={handleSignup} className="flex h-[46px] w-full items-center justify-center rounded-lg bg-[#4285F4] font-display text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#3367D6] disabled:opacity-60">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Sign Up
                  </button>
                </div>
                <p className="mt-5 text-sm text-[#6a6a6a]">Already have an account? <button onClick={() => setView("login")} className="font-medium text-[#4285F4] hover:underline">Sign In</button></p>
              </motion.div>
            )}

            {/* ── FORGOT PASSWORD ── */}
            {view === "forgot" && (
              <motion.div key="forgot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <button onClick={() => setView("login")} className="inline-flex items-center gap-1 text-sm text-[#6a6a6a] hover:text-[#DB4437] transition-colors mb-6"><ChevronLeft className="h-4 w-4" />Back to sign in</button>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#1C2434]">Forgot Your Password?</h2>
                <p className="mt-2 max-w-sm text-sm text-[#6a6a6a] leading-relaxed">Enter the email address linked to your account, and we&apos;ll send you a link to reset your password.</p>
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1C2434]">Email <span className="text-[#DB4437]">*</span></label>
                    <Input type="email" placeholder="Enter your email" className="h-[46px] border-[#E2E8F0] bg-transparent text-sm placeholder:text-[#AEB7C0] focus-visible:ring-[#4285F4]/30 focus-visible:border-[#4285F4]" disabled={isLoading} value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
                  </div>
                  <button type="button" disabled={isLoading || !forgotEmail.trim()} onClick={handleForgotPassword} className="flex h-[46px] w-full items-center justify-center rounded-lg bg-[#4285F4] font-display text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#3367D6] disabled:opacity-60">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send Reset Link
                  </button>
                </div>
                <p className="mt-5 text-sm text-[#6a6a6a]">Wait, I remember my password... <button onClick={() => setView("login")} className="font-medium text-[#4285F4] hover:underline">Click here</button></p>
              </motion.div>
            )}

            {/* ── VERIFICATION ── */}
            {view === "verification" && (
              <motion.div key="verification" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[#1C2434]">Two Step Verification</h2>
                <p className="mt-2 max-w-sm text-sm text-[#6a6a6a] leading-relaxed">A verification code has been sent to your email. Please enter it below.</p>
                <div className="mt-6">
                  <p className="mb-3 text-sm font-medium text-[#1C2434]">Type your 6 digits security code</p>
                  <VerificationCodeInput onComplete={handleVerification} disabled={isLoading} />
                  {isLoading && <div className="mt-4 flex justify-center"><Loader2 className="h-5 w-5 animate-spin text-[#AEB7C0]" /></div>}
                  <button type="button" disabled={isLoading} onClick={() => handleVerification("")} className="mt-6 flex h-[46px] w-full items-center justify-center rounded-lg bg-[#4285F4] font-display text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#3367D6] disabled:opacity-60">Verify My Account</button>
                </div>
                <p className="mt-5 text-sm text-[#6a6a6a]">Didn&apos;t get the code? <button className="font-medium text-[#4285F4] hover:underline" onClick={async () => {
                  try {
                    if (verifyingFor === "signup" && signUpLoaded) await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                    else if (verifyingFor === "login" && signInLoaded) await signIn.prepareSecondFactor({ strategy: "email_code" });
                    toast.info("New code sent to your email.");
                  } catch (error) { const { message } = getFriendlyError(error); toast.error(message); }
                }}>Resend</button></p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </>
  );
}
