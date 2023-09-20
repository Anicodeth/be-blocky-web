import { toast } from "../components/ui/use-toast";

export const errorToast = (e: { [key in string]: { message?: string } }) => {
  const listOfErrors = Object.keys(e)
    .map((k) => e[k as keyof typeof e]?.message)
    .map((d) => `- ${d}`)
    .join("\r\n");
  return toast({
    title: Object.keys(e).map((k) => e[k as keyof typeof e]?.message)[0],
    description: listOfErrors,
    variant: "destructive",
  });
};
