"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useRef, useEffect, useState, use } from "react";
import { verifyEmailAction } from "@/actions/verify-email-action";


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

	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
		<div className="min-h-screen bg-gradient-to-br from-[#F7F4EF] to-white flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<div className="mb-8">
						<h1 className="text-2xl font-bold text-gray-900 mb-2">
							Vérification de l'email
						</h1>
						<div className="w-16 h-1 bg-[#166970] rounded-full"></div>
					</div>

					<div className="mb-8">
						<h2 className="text-lg font-semibold text-gray-900 mb-2">
							Code de vérification
						</h2>
						<p className="text-sm text-gray-600">
							Nous avons envoyé un code de vérification à {email}
						</p>
					</div>

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
							className="w-full bg-[#166970] hover:bg-[#145a61] text-white font-medium py-3 px-4 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
							disabled={!isFormValid || isPending}
						>
							{isPending ? "Vérification en cours..." : "Vérifier"}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}