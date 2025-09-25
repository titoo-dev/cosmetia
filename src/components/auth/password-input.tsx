'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type PasswordInputProps = {
	id?: string;
	placeholder?: string;
	className?: string;
	required?: boolean;
	disabled?: boolean;
};

export function PasswordInput({ 
	id = "password", 
	placeholder = "********",
	className = "w-full",
	required = false,
	disabled = false
}: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative">
			<Input
				id={id}
				name='password'
				type={showPassword ? 'text' : 'password'}
				placeholder={placeholder}
				className={`${className} h-12 border border-gray-300 rounded-md px-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
				required={required}
				disabled={disabled}
			/>
			<button
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
				disabled={disabled}
			>
				{showPassword ? (
					<EyeOffIcon className="h-4 w-4" />
				) : (
					<EyeIcon className="h-4 w-4" />
				)}
			</button>
		</div>
	);
}
