'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LoginForm } from './login-form';

import { ReactNode, isValidElement } from 'react';

type LoginDialogProps = {
	/**
	 * Optional custom trigger component. If not provided, a default login button is used.
	 */
	trigger?: ReactNode;
};

export function LoginDialog({ trigger }: LoginDialogProps) {
	const defaultTrigger = (
		<Button
			variant="outline"
			size="default"
			className="border-none shadow-none cursor-pointer"
		>
			Connexion
		</Button>
	);

	/**
	 * If a custom trigger is provided, ensure it can receive ref and onClick via asChild.
	 * Otherwise, use the default trigger button.
	 */
	const triggerElement =
		trigger && isValidElement(trigger) ? trigger : defaultTrigger;

	return (
		<Dialog>
			<DialogTrigger asChild>{triggerElement}</DialogTrigger>
			<DialogContent className="sm:max-w-md bg-white border-0 shadow-lg">
				<DialogHeader className="text-center space-y-2 pb-4">
					<DialogTitle className="text-3xl font-bold text-gray-900">
						Connectez-vous
					</DialogTitle>
					<p className="text-gray-700 text-base font-normal">
						Bienvenue à nouveau parmi nous sur Cosmetia
					</p>
				</DialogHeader>
				<LoginForm />
			</DialogContent>
		</Dialog>
	);
}
