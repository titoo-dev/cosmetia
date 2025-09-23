"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState } from "react";
import { signupAction } from "@/actions/signup-action";


export default function SignupPage() {
    const [state, formAction, isPending] = useActionState(signupAction, {
        errors: {},
        message: "",
    });

    return (
        <div className="min-h-screen flex">
            {/* Left side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/images/signup-bg.jpg')",
                        filter: "brightness(0.7)"
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#166970]/20 to-[#166970]/40"></div>
                </div>
                <div className="absolute top-8 left-8">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#166970] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <span className="text-xl font-bold text-white font-space-grotesk">
                            Cosmetia
                        </span>
                    </div>
                </div>
            </div>

            {/* Right side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F7F4EF] overflow-y-auto">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
                        <div className="w-8 h-8 bg-[#166970] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <span className="text-xl font-bold text-[#166970] font-space-grotesk">
                            Cosmetia
                        </span>
                    </div>

                    <Card className="shadow-none">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold text-black font-space-grotesk">
                                Inscription acheteur
                            </CardTitle>
                            <CardDescription className="text-gray-600 font-plus-jakarta">
                                Veuillez fournir vos informations
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form action={formAction} className="space-y-6">
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="votre@email.com"
                                        className={state.errors?.email ? "border-red-500" : ""}
                                        disabled={isPending}
                                    />
                                    {state.errors?.email && (
                                        <p className="text-sm text-red-600">{state.errors.email}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">
                                        Mot de passe *
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Votre mot de passe"
                                        className={state.errors?.password ? "border-red-500" : ""}
                                        disabled={isPending}
                                    />
                                    {state.errors?.password && (
                                        <p className="text-sm text-red-600">{state.errors.password}</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                        Confirmer le mot de passe *
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirmez votre mot de passe"
                                        className={state.errors?.confirmPassword ? "border-red-500" : ""}
                                        disabled={isPending}
                                    />
                                    {state.errors?.confirmPassword && (
                                        <p className="text-sm text-red-600">{state.errors.confirmPassword}</p>
                                    )}
                                </div>

                                {/* Signup Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#166970] hover:bg-[#145a61]"
                                    size="lg"
                                    disabled={isPending}
                                >
                                    {isPending ? "Inscription en cours..." : "S'inscrire"}
                                </Button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Ou</span>
                                    </div>
                                </div>

                                {/* LinkedIn Signup */}
                                <Button
                                    type="button"
                                    className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white"
                                    size="lg"
                                    disabled={isPending}
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    S'inscrire avec LinkedIn
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="justify-center">
                            <span className="text-gray-600">Déjà un compte ? </span>
                            <Link
                                href="/login"
                                className="text-[#166970] hover:text-[#145a61] font-semibold transition-colors ml-1"
                            >
                                Se connecter
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
