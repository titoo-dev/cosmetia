"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState, useRef, useEffect, useState, use } from "react";
import { verifyEmailAction } from "@/actions/customer/register/verify-email-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VerifyPage({
	searchParams,
}: {
	searchParams: Promise<{ email: string }>;
}) {
	const params = use(searchParams);
	const [state, formAction, isPending] = useActionState(verifyEmailAction, {
		error: "",
	});
	const [otp, setOtp] = useState(['', '', '', '', '', '']);
	const [email] = useState(params?.email || '');
	const router = useRouter();

	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	useEffect(() => {
		if (state.success) {
			toast.success(state.message);
			router.push('/customer/register/last-step');
		}
	}, [state.success]);

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	const handleInputChange = (index: number, value: string) => {
		if (value.length > 1) return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData('text').slice(0, 6);
		const newOtp = [...otp];

		for (let i = 0; i < pastedData.length && i < 6; i++) {
			if (/^\d$/.test(pastedData[i])) {
				newOtp[i] = pastedData[i];
			}
		}

		setOtp(newOtp);

		const nextEmptyIndex = newOtp.findIndex(
			(digit, idx) => !digit && idx < 6
		);
		const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
		inputRefs.current[focusIndex]?.focus();
	};

	const isFormValid = otp.every((digit) => digit !== '');

	return (
		<Card className="shadow-none">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl font-bold text-black font-space-grotesk">
					Vérification de l'email
				</CardTitle>
				<CardDescription className="text-gray-600 font-plus-jakarta">
					Nous avons envoyé un code de vérification à {email}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form action={formAction} className="space-y-6">
					<input type="hidden" name="email" value={email} />
					<input type="hidden" name="otp" value={otp.join('')} />
					
					<div className="flex justify-center gap-3">
						{otp.map((digit, index) => (
							<Input
								key={index}
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type="text"
								inputMode="numeric"
								pattern="[0-9]"
								maxLength={1}
								value={digit}
								onChange={(e) =>
									handleInputChange(
										index,
										e.target.value.replace(/\D/g, '')
									)
								}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={handlePaste}
								className="w-12 h-12 text-center text-lg font-semibold border-2 rounded-md focus:border-[#166970] focus:ring-[#166970]/20"
								aria-label={`Digit ${index + 1}`}
								disabled={isPending}
							/>
						))}
					</div>

					{state.error && (
						<p className="text-sm text-red-600 text-center">{state.error}</p>
					)}

					{state.message && (
						<p className="text-sm text-green-600 text-center">{state.message}</p>
					)}

					<Button
						type="submit"
						className="w-full bg-[#166970] hover:bg-[#145a61]"
						size="lg"
						disabled={!isFormValid || isPending}
					>
						{isPending ? "Vérification en cours..." : "Vérifier"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}