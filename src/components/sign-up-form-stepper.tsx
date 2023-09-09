import { User } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type Step = {
    id: string,
    description: string,
    value: string,
    render: ({ setStepVal }: { setStepVal: (state: string) => void }) => JSX.Element | null
}

const defaultSteps: Step[] = [{
    id: "1",
    description: "Choose your role",
    value: "",
    render: ({ setStepVal }) => {
        return (
            <div>
                <div className=" flex items-center justify-between gap-2 mb-4">
                    <Card className=" flex-grow  cursor-pointer hover:bg-white/70 transition-all duration-300" onClick={() => setStepVal("parent")}>
                        <CardContent className=" flex flex-col space-y-4 py-4 items-center justify-center">
                            <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className=" fill-brand-orange w-10 h-10"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <path d="M165.865,85.55c23.636,0,42.779-19.159,42.779-42.77C208.644,19.142,189.501,0,165.865,0 c-23.636,0-42.779,19.142-42.779,42.779C123.086,66.391,142.229,85.55,165.865,85.55z"></path> <path d="M222.061,97.624H109.669c-20.726,0-43.274,22.548-43.274,43.282v143.768c0,10.363,8.396,18.767,18.758,18.767 c10.363,0,18.775-8.404,18.775-18.767V166.469h8.651v320.88c0,13.616,11.035,24.651,24.644,24.651 c13.625,0,24.66-11.035,24.66-24.651V301.138h7.964v186.211c0,13.616,11.035,24.651,24.66,24.651 c13.609,0,24.644-11.035,24.644-24.651v-320.88h8.668v118.204c0,10.363,8.396,18.767,18.758,18.767 c10.379,0,18.759-8.404,18.759-18.767V140.906C265.335,120.172,242.787,97.624,222.061,97.624z"></path> <path d="M373.041,256.72c19.206,0,34.758-15.568,34.758-34.751c0-19.206-15.552-34.759-34.758-34.759 c-19.206,0-34.758,15.552-34.758,34.759C338.283,241.152,353.835,256.72,373.041,256.72z"></path> <path d="M412.989,278.117h-84.718c-15.616,0-32.616,16.992-32.616,32.624v75.482c0,7.812,6.333,14.145,14.137,14.145 c7.812,0,14.153-6.333,14.153-14.145v-56.212h6.525v163.407c0,10.267,8.316,18.582,18.566,18.582 c10.275,0,18.592-8.316,18.592-18.582v-94.785h6.005v94.785c0,10.267,8.316,18.582,18.582,18.582 c10.259,0,18.582-8.316,18.582-18.582V330.011h6.525v56.212c0,7.812,6.332,14.145,14.137,14.145 c7.828,0,14.144-6.333,14.144-14.145v-75.482C445.605,295.108,428.614,278.117,412.989,278.117z"></path> </g> </g></svg>
                            <p className=" text-center font-medium text-xl">
                                Parent
                            </p>
                        </CardContent>
                    </Card>
                    <Card className=" flex-grow cursor-pointer hover:bg-white/70 transition-all duration-300" onClick={() => setStepVal("school")}>
                        <CardContent className=" flex flex-col space-y-4 py-4 items-center justify-center">
                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className=" fill-brand-orange h-10 w-10"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path className=" fill-brand-orange" d="M224 128v704h576V128H224zm-32-64h640a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"></path><path className=" fill-brand-orange" d="M64 832h896v64H64zm256-640h128v96H320z"></path><path className=" fill-brand-orange" d="M384 832h256v-64a128 128 0 1 0-256 0v64zm128-256a192 192 0 0 1 192 192v128H320V768a192 192 0 0 1 192-192zM320 384h128v96H320zm256-192h128v96H576zm0 192h128v96H576z"></path></g></svg>
                            <p className=" text-center font-medium text-xl">
                                School
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <Card className=" flex-grow cursor-pointer hover:bg-white/70 transition-all duration-300" onClick={() => setStepVal("student")}>
                    <CardContent className=" flex flex-col space-y-4 py-4 items-center justify-center ">
                        <User className=" h-10 w-10 text-brand-orange" />
                        <p className=" text-center font-medium text-xl">
                            Student
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }
}, {
    id: "2",
    description: "Your Details",
    value: "",
    render: () => null
}, {
    id: "3",
    description: "Choose Package Plan",
    value: "",
    render: () => null
}, {
    id: "4",
    description: "Sign up confirmation",
    value: "",
    render: () => null
}]
export const SignUpForm = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()
    const [steps, setSteps] = useState(defaultSteps)
    const [activeStep, setActiveStep] = useState<Step>(steps[0])
    useEffect(() => {
        const stepParam = searchParams.get("step")
        setActiveStep(steps.find(s => s.id === stepParam) ?? steps[0])
    }, [searchParams])
    function setStepValue(val: string) {
        activeStep.value = val
        setSteps(s => [...s.filter(st => st.id !== activeStep.id), activeStep].sort((a, b) => parseInt(a.id) - parseInt(b.id)))
        router.push(pathname + `?step=${parseInt(activeStep.id) + 1}`, {
            scroll: true,
        })
    }
    return (
        <div>
            <div className=" flex">
                <div className=" flex items-center  w-full justify-between  p-1 rounded-full ">
                    {
                        steps.map(step => (
                            <>
                                {
                                    parseInt(activeStep.id) > parseInt(step.id) ?
                                        <div className="relative text-white flex-grow flex items-center" key={step.id}>
                                            <span className=" bg-brand-orange h-4 w-4 p-4 items-center flex justify-center rounded-full text-white">
                                                {step.id}
                                            </span>
                                            <motion.line
                                                initial={{
                                                    width: 0
                                                }}

                                                animate={{
                                                    width: "100%"
                                                }}
                                                className=" h-1  bg-brand-orange" />
                                        </div> :
                                        <div key={step.id} className=" flex-grow ">
                                            <span className={cn(" border bg-gray-100 h-4 w-4 p-4 items-center flex justify-center rounded-full text-brand-orange", activeStep.id === step.id && "border-brand-orange")}>
                                                {step.id}
                                            </span>
                                        </div>
                                }
                            </>
                        ))
                    }
                </div>
            </div>
            <p className=" border-l-4 border-brand-orange pl-2 my-4">
                {activeStep.description}
            </p>
            <activeStep.render setStepVal={setStepValue} />
        </div>
    )
}