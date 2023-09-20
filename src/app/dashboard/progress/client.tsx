"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { Student } from "@/types";
import { AddChildModal } from "@/components/dialogs/add-child-modal";
import { EmptyPlaceholder } from "@/components/empty-placehoder";
import { StudentCard } from "@/components/student-card";
import { Clock, Coins, Trophy, Laptop, Users2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Overview } from "@/components/weekly-report";

interface props {
  data: Student[]
}
export const ProgressTabs = ({ data }: props) => {
  return (
    <Tabs
      aria-label="Options"
      size="lg"
      variant="solid"
      radius="full"
      classNames={{
        tabList: "bg-brand-green rounded-full w-1/2",
        tabContent:
          "group-data-[selected=true]:text-[#68b946] text-[#ffffff] font-bold md:text-xl px-4",
        base: "flex flex-col items-center",
      }}
    >
      <Tab key="child" title="Child">
        {data?.length ? (
          <div>
            {data.map((student) => (
              <StudentCard student={student} key={student.name} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="Student" />
            <EmptyPlaceholder.Title>
              No Children/Student Added
            </EmptyPlaceholder.Title>
            <AddChildModal />
          </EmptyPlaceholder>
        )}
      </Tab>
      <Tab key="children" title="Children">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-x-12 lg:mb-0 place-items-center text-dark-ebony w-full h-full">
          <div className="mb-12 lg:mb-0">
            <div className="grid grid-cols-2 gap-4">
              <Overview />
              <div className="grid grid-rows-3 gap-4">
                <div className="flex flex-row sm:flex-row items-center">
                  <div className="rounded-full p-3 bg-gray-100 mr-5">
                    <Clock className="text-ecstasy" size={40} />
                  </div>
                  <div className="flex flex-col text-xl">
                    <span className="text-base">Hours Spent</span>
                    <span className="font-bold">16</span>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-row items-center">
                  <div className="rounded-full p-3 bg-gray-100 mr-5">
                    <Coins className="text-ecstasy" size={40} />
                  </div>
                  <div className="flex flex-col text-xl">
                    <span className="text-base">Coins Earned</span>
                    <span className="font-bold">126</span>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-row items-center">
                  <div className="rounded-full p-3 bg-gray-100 mr-5">
                    <Trophy className="text-ecstasy" size={40} />
                  </div>
                  <div className="flex flex-col text-xl">
                    <span className="text-base">Achievements</span>
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Achievements</h2>
              <div className="grid grid-cols-4 mt-5 space-x-5">
                <div className="flex flex-col sm:flex-col items-start">
                  <p className="font-bold text-lg mb-3">Coding Streaks</p>
                  <div className="rounded-full p-3 bg-gray-100 mx-8">
                    <Trophy className="text-ecstasy" size={40} />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-col items-start">
                  <p className="font-bold text-lg mb-3">Mastery Level</p>
                  <div className="rounded-full p-3 bg-gray-100 mx-8">
                    <Trophy className="text-ecstasy" size={40} />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-col items-start">
                  <p className="font-bold text-lg mb-3">Finished Challenge</p>
                  <div className="rounded-full p-3 bg-gray-100 mx-12">
                    <Trophy className="text-ecstasy" size={40} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 -mt-40">
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              {data &&
                data.map(
                  (student, index) =>
                    `${student.name}${index < data.length - 1 ? ", " : ""}`
                )}
            </h1>
            <p className="text-center">
              {data &&
                `${data.length}${
                  data.length > 1 ? " Children" : " Child"
                }`}
            </p>
            <div className="flex justify-start items-start space-x-4 text-sm bg-slate-50 px-10 py-2 mt-2">
              <div className="flex flex-col items-start space-x-2">
                <span>4</span>
                Avr.hour
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col items-start space-x-2">
                <span>2</span>
                Rewards
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col items-start space-x-2">
                <span>{data.length || "0"}</span>
                Enrolled
              </div>
              <Separator orientation="vertical" />
              <div className="flex flex-col items-start space-x-2">
                <span>{"0"}</span>
                Credits
              </div>
            </div>
            <h3 className="font-bold text-lg my-5 text-start">
              Courses They&apos;re Taking
            </h3>
            <div className="flex flex-row justify-start items-start space-x-3">
              <div className="rounded-md p-2 bg-gray-100">
                <Laptop className="text-ecstasy" size={70} />
              </div>
              <div className="grid grid-rows-4">
                <p className="row text-lg">UI/UX Designing</p>
                <p className="row text-xs">Intermediate level</p>
                <p className="row text-xs -my-2">58%</p>
                <p className="row text-xs flex flex-row -my-4">
                  <Users2 className="text-ecstasy" size={15} />
                  2.2k
                </p>
              </div>
            </div>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};
