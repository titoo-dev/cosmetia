'use client';
import { LogOut, Loader2, Star, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useTransition } from 'react';
import { logout } from '@/actions/logout';
import { UserEntity } from '@/lib/types/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

type UserMenuProps = {
	user: UserEntity | null;
};

export function UserMenu({ user }: UserMenuProps) {
	const [isPending, startTransition] = useTransition();

	const userInitials = user?.email
		? user.email
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
		: 'U';

	const handleLogout = () => {
		startTransition(async () => {
			await logout();
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="relative h-8 w-8 rounded-full ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
					<Avatar className="h-8 w-8">
						<AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
							{userInitials}
						</AvatarFallback>
					</Avatar>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80 p-0" align="end" forceMount>
				{/* User Profile Header */}
				<div className="bg-[#F8F7F5] px-6 py-8 rounded-t-lg">
					<div className="flex flex-col items-center space-y-4">
						{/* Logo/Avatar */}
						<div className="relative">
							<div className="w-16 h-16 bg-[#34A853] rounded-lg flex items-center justify-center shadow-sm">
								<div className="w-8 h-8 text-white">
									<svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
										<path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
									</svg>
								</div>
							</div>
						</div>
						
						{/* User Name */}
						<div className="text-center">
							<h3 className="text-lg font-bold text-black">
								{user?.customer?.nameOfContact || 'Guest'}
							</h3>
							<p className="text-sm text-gray-600 mt-1">
								{user?.email || 'Guest'}
							</p>
						</div>
					</div>
				</div>

				{/* Menu Items */}
				<div className="bg-white rounded-b-lg">
					<DropdownMenuItem asChild>
						<Link
							href="/customer/profile"
							className="cursor-pointer flex items-center w-full px-6 py-4 hover:bg-gray-50"
						>
							<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
								<Settings className="h-4 w-4 text-[#34A853]" />
							</div>
							<span className="text-black">Paramètres du compte</span>
						</Link>
					</DropdownMenuItem>
					
					<div className="border-t border-gray-200"></div>
					
					<DropdownMenuItem asChild>
						<Link
							href="/customer/favorites"
							className="cursor-pointer flex items-center w-full px-6 py-4 hover:bg-gray-50"
						>
							<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
								<Star className="h-4 w-4 text-[#34A853]" />
							</div>
							<span className="text-black">Favoris</span>
						</Link>
					</DropdownMenuItem>
					
					<div className="border-t border-gray-200"></div>
					
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<DropdownMenuItem
								onSelect={(e) => e.preventDefault()}
								className="cursor-pointer flex items-center w-full px-6 py-4 hover:bg-gray-50 text-red-600 focus:text-red-600"
								disabled={isPending}
							>
								<div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-3">
									<LogOut className="h-4 w-4 text-[#EA4335]" />
								</div>
								<span>Déconnexion</span>
							</DropdownMenuItem>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Confirm Logout ?
								</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to logout? You will need to sign in again to access your account.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel disabled={isPending}>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction
									onClick={handleLogout}
									disabled={isPending}
								>
									{isPending && (
										<Loader2 className="size-4 animate-spin mr-2" />
									)}
									Logout
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
