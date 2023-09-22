"use client";
import { AddChildModal } from "@/components/dialogs/add-child-modal";
import { EmptyPlaceholder } from "@/components/empty-placehoder";
import { StudentCard } from "@/components/student-card";
import { Student } from "@/types";

interface props {
  data: Student[];
}
export const ProgressTabs = ({ data }: props) => {
  return (
    <>
      {data?.length ? (
        <div className=" py-4 flex md:flex-row flex-col items-start gap-4">
          {data.map((student) => (
            <StudentCard
              classrooms={[]}
              student={student}
              key={student.name}
            />
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
    </>
  );
};
