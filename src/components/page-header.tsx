import { Label } from "./ui/label"

interface Props {
    title: string
    description: string
}

export function PageHeader({ title, description }: Props) {
    return (
        <div className=" border-b pb-6 border-orange-500/60">
            <h2 className=" text-brand-orange text-4xl font-bold">
                {title}
            </h2>
            <Label>
                {description}
            </Label>
        </div>
    )
}