import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    size?: number
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, size, ...props }, ref) => {
        const [hidePassword, setHidePassword] = React.useState(true)
        return (
            <div className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 items-center justify-between",
                className
            )}>
                <input
                    className=" outline-none flex-grow"
                    type={hidePassword ? "password" : 'text'}
                    ref={ref}
                    {...props}

                />
                <div className=" cursor-pointer">
                    {
                        !hidePassword ? <Eye size={size ?? 18} onClick={() => setHidePassword(true)} /> : <EyeOff size={size ?? 18} onClick={() => setHidePassword(false)} />
                    }
                </div>
            </div>
        )
    }
)
PasswordInput.displayName = "Input"

export { PasswordInput }
