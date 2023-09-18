"use client"
import { Tab, Tabs } from "@nextui-org/react"
import { tabStyle } from '../../../lib/style';



export const ProgressTabs = () => {
    return (
        <Tabs aria-label="Options" size="lg" variant="solid" radius="full" classNames={{
            tabList: "bg-brand-green rounded-full w-1/2",
            tabContent: "group-data-[selected=true]:text-[#68b946] text-[#ffffff] font-bold md:text-xl px-4",
            base: "flex flex-col items-center"
        }}>
            <Tab key="child" title="Child" className=" flex md:items-center flex-col md:flex-row">

            </Tab>
            <Tab key="children" title="Children">

            </Tab>
        </Tabs>
    )
}