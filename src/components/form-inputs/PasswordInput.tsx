import { FC } from "react";
import { Input, InputProps } from "../ui/input";
import { Button } from "../ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToggle } from "~/hooks/use-toggle";

const PasswordInput: FC<InputProps> = (props) => {
    const [showPassword, togglePassword] = useToggle();
    return (
        <div className="relative">
            <Input {...props} type={showPassword ? "text" : "password"} />
            <Button
                type="button"
                variant={"ghost"}
                className="rounded-lg absolute right-3 top-1/2 -translate-y-1/2"
                onClick={togglePassword}
            >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
        </div>
    );
};

export default PasswordInput;
