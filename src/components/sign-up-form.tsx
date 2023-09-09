import { ExternalLink, School, School2, User, User2, Users } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Icons } from "./icons"

export const SignUpForm = () => {
    return (
        <div>
            <div className=" space-y-4">
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose your role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="parent">
                                <div className=" flex items-center gap-2">
                                    <Users size={18} />
                                    Parent
                                </div>
                            </SelectItem>
                            <SelectItem value="school">
                                <div className=" flex items-center gap-2">
                                    <School2 size={18} />
                                    School
                                </div>
                            </SelectItem>
                            <SelectItem value="student">
                                <div className=" flex items-center gap-2">
                                    <User size={18} />
                                    Student
                                </div>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input placeholder="Email" type="email" className=" h-10" />
                <Input placeholder="Password" type="password" className=" h-10" />
                <Input placeholder="Repeat Password" type="password" className=" h-10" />
            </div>
            <Button className=" w-full text-lg mt-4" size="lg">
                Sign Up
            </Button>
        </div>
    )
}