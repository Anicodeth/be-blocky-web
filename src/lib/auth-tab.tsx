"use client"

import { Tabs, Tab } from "@nextui-org/react";
import { SignUpForm } from "../components/sign-up-form";
import { SignInForm } from "../components/sign-in-form";

export function AuthTab() {
    return (
        <div className="flex flex-col w-max">
            <Tabs aria-label="Options" size="lg" defaultValue="sign-in" variant="solid" radius="full" classNames={{
                tabList: "bg-brand-green rounded-full w-[480px]",
                tabContent: "group-data-[selected=true]:text-[#68b946] text-[#ffffff] font-bold text-xl px-10",
            }}>
                <Tab key="sing-in" title="Sign In">
                    <SignInForm />
                </Tab>
                <Tab key="register" title="Register">
                    <SignUpForm />
                </Tab>
            </Tabs>
        </div>
    )
}