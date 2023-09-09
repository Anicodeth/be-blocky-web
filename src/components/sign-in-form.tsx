import { Button } from "./ui/button"
import { Input } from "./ui/input"



export const SignInForm = () => {
    return (
        <div>
            <div className=" space-y-4">
                <Input placeholder="Email" type="email" className=" h-10" />
                <Input placeholder="Password" type="password" className=" h-10" />
                <Button className=" w-full text-lg" size="lg">
                    Login
                </Button>
            </div>
            <p className=" text-center mt-4 font-medium cursor-pointer hover:underline transition-all duration-300">
                Forgot Password?
            </p>
        </div>
    )
}