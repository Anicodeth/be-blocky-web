import { ArrowRight, Star, StarHalf } from "lucide-react";
import Head from "next/head";
import Image from "next/image";

import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Logo from "../../../../public/assets/images/logo.png";

export default function CoursesRoute() {
    return (
        <>
            <Head>
                <title>BeBlocky Dashboard</title>
                <meta name="description" content="Welcome to BeBlocky Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container grid items-center gap-2 pb-4 pt-2 md:py-5 text-dark-ebony">
                <PageHeader title="Courses" description=" Discover and select your preferred course of interest." />
                <h2 className="text-2xl font-bold tracking-tight">Most Popular Courses</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 items-center gap-4 pb-4 pt-2">
                    <Card className="text-dark-ebony">
                        <CardHeader>
                            <Image src={Logo} alt="Course image" width={220} height={150} className="mx-auto rounded-xl border border-apple mb-3" />
                            <div className="flex flex-row justify-center gap-2">
                                <Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">HTML</Badge><Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">CSS</Badge><Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">JS</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="-mt-5">
                            <p className="text-2xl font-semibold">Web Development Course</p>
                            <div className="flex flex-row justify-between items-center mt-2">
                                <div className="flex gap-1">
                                    <Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><StarHalf className="text-apple" size={16} />
                                </div>
                                <p className="mt-2">4.7 Rating</p>
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <h2 className="text-2xl font-bold tracking-tight -mt-4">All Courses</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-1 items-center gap-4 pb-4 pt-2">
                    <Card className="text-dark-ebony">
                        <CardHeader>
                            <Image src={Logo} alt="Course image" width={220} height={150} className="mx-auto rounded-xl border border-apple mb-3" />
                            <div className="flex flex-row justify-center gap-2">
                                <Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">HTML</Badge><Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">CSS</Badge><Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">JS</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="-mt-5">
                            <p className="text-2xl font-semibold">Web Development Course</p>
                            <div className="flex flex-row justify-between items-center mt-2">
                                <div className="flex gap-1">
                                    <Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><StarHalf className="text-apple" size={16} />
                                </div>
                                <p className="mt-2">4.7 Rating</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row justify-between items-center">
                            <div className="rounded-full p-1 bg-gray-100 ml-auto">
                                <ArrowRight size={24} className="text-ecstasy" />
                            </div>
                        </CardFooter>
                    </Card>
                    <Card className="text-dark-ebony">
                        <CardHeader>
                            <Image src={Logo} alt="Course image" width={220} height={150} className="mx-auto rounded-xl border border-apple mb-3" />
                            <div className="flex flex-row justify-center gap-2">
                                <Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">HTML</Badge><Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">CSS</Badge><Badge variant="secondary" className="rounded-xl text-dark-ebony bg-gray-200">JS</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="-mt-5">
                            <p className="text-2xl font-semibold">Web Development Course</p>
                            <div className="flex flex-row justify-between items-center mt-2">
                                <div className="flex gap-1">
                                    <Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><Star size={16} className="text-apple" /><StarHalf className="text-apple" size={16} />
                                </div>
                                <p className="mt-2">4.7 Rating</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row justify-between items-center">
                            <div className="rounded-full p-1 bg-gray-100 ml-auto">
                                <ArrowRight size={24} className="text-ecstasy" />
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}