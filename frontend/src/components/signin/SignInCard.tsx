// components/SignInCard.tsx
import { Button } from "@/components/ui/button";
import { FaWallet } from "react-icons/fa";

import { IconType } from "react-icons";
import { IconBaseProps } from "react-icons";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  icon: IconType;
  className?: string;
}

const Icon = ({ icon: IconComponent, className, ...props }: IconProps) => {
  // Create safe props object that matches IconBaseProps
  const iconProps: IconBaseProps & React.HTMLAttributes<SVGElement> = {
    className,
    ...props
  };
  
  return <IconComponent {...iconProps} />;
};

export const SignInCard = () => (
    <div className="relative z-10 max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Flashlearn DAO</h1>
        <p className="text-gray-500 mb-8">Learn. Earn. Govern.</p>

        <Button className="w-full text-lg py-6 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow">
            <Icon icon={FaWallet} className="text-xl" />  
            Connect Wallet
        </Button>

        <p className="mt-8 text-sm text-gray-400">No account needed. Just connect your wallet.</p>
    </div>
  );
  

