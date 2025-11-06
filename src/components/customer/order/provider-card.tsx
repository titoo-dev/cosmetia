import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  isCertified: boolean;
  description: string;
}

interface ProviderCardProps {
  provider: Provider;
  isSelected: boolean;
  onSelect: () => void;
}

export function ProviderCard({
  provider,
  isSelected,
  onSelect,
}: ProviderCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card
      onClick={onSelect}
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "ring-2 ring-teal-700 ring-offset-2" : ""
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={provider.avatar} alt={provider.name} />
          <AvatarFallback className="bg-teal-100 text-teal-700">
            {getInitials(provider.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{provider.name}</h3>
          {provider.isCertified && (
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-gray-600">Certifié</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {provider.description}
      </p>
    </Card>
  );
}
