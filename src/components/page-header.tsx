import { Label } from "./ui/label"

interface Props {
    title: string
    description: string
}

export function PageHeader({ title, description }: Props) {
    return (
        <div className=" border-b pb-6">
            <h2 className="text-ecstasy text-xl lg:text-4xl font-bold">
                {title}
            </h2>
            <Label>
                {description}
            </Label>
        </div>
    )
}