'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from './password-input';
import { useState, useTransition } from 'react';
import { signinAction } from '@/actions/signin-action';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function LoginForm() {
	const [isPending, startTransition] = useTransition();
	const [errors, setErrors] = useState<{ email?: string[]; password?: string[] }>({});
	const router = useRouter();

	const handleSubmit = async (formData: FormData) => {
		startTransition(async () => {
			try {
				const result = await signinAction(null, formData);
				
				if (result.success) {
					toast.success('Login successful');
					router.push('/marketplace');
					return;
				}
				
				if (result.error) {
					toast.error(result.error);
					setErrors({});
					return;
				}
				
				if (result.errors) {
					setErrors(result.errors);
					if (result.message) {
						toast.error(result.message);
					}
					return;
				}
			} catch (error) {
				toast.error('An unexpected error occurred');
			}
		});
	};

	return (
		<form action={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="email">
					Email *
				</Label>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="votre@email.com"
					className={errors?.email ? "border-red-500" : ""}
					disabled={isPending}
				/>
				{errors?.email && (
					<p className="text-sm text-red-600">{errors.email[0]}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">
					Mot de passe *
				</Label>
				<PasswordInput 
					className={errors?.password ? "border-red-500" : ""}
					disabled={isPending} 
				/>
				{errors?.password && (
					<p className="text-sm text-red-600">{errors.password[0]}</p>
				)}
			</div>

			<Button
				type="submit"
				className="w-full bg-[#166970] hover:bg-[#145a61]"
				size="lg"
				disabled={isPending}
			>
				{isPending ? 'Connexion...' : 'Se connecter'}
			</Button>
		</form>
	);
}
