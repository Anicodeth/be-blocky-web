"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { Student } from "@/types";
import { AddChildModal } from "@/components/dialogs/add-child-modal";
import { EmptyPlaceholder } from "@/components/empty-placehoder";
import { StudentCard } from "@/components/student-card";

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
            <EmptyPlaceholder.Title>No Children/Student Added</EmptyPlaceholder.Title>
            <AddChildModal />
          </EmptyPlaceholder>
        )}
      </Tab>
      <Tab key="children" title="Children"></Tab>
    </Tabs>
  );
};
