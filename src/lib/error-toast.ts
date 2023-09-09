import { toast } from "../components/ui/use-toast"

export const errorToast = (e: { [key in string]: { message?: string } }) => {
    return toast({
        title: Object.keys(e).map((k) => e[k as keyof typeof e]?.message)[0],
        variant: "destructive"
    })
}