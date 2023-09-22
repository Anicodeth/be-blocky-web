import { ReactNode } from "react";

interface Props {
    children: ReactNode
}


export default function ProgressLayout({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
}