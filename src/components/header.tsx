
import { Logo } from "./logo";
import { Navigation } from "./navigation";

export function Header() {

    return (
        <header className="border-b border-gray-100">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Logo />
                    <Navigation />
                </div>
            </div>
        </header>
    );
}
