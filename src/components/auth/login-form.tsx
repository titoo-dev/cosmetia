'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from './password-input';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { signinAction } from '@/actions/signin-action';
import { Label } from '../ui/label';

type LoginFormProps = {
	onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
	const [state, formAction, isPending] = useActionState(signinAction, {
		error: '',
	});

	// Handle success/error based on state changes
	useEffect(() => {
		if (state.success) {
			toast.success('Login successful');
			onSuccess?.();
		} else if (state.error) {
			toast.error(state.error);
		}
	}, [state, onSuccess]);

	return (
		<form action={formAction} className="space-y-6">
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

			<div className="space-y-2">
				<Label htmlFor="password">
					Mot de passe *
				</Label>
				<PasswordInput 
					className={state.errors?.password ? "border-red-500" : ""}
					disabled={isPending} 
				/>
				{state.errors?.password && (
					<p className="text-sm text-red-600">{state.errors.password}</p>
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
