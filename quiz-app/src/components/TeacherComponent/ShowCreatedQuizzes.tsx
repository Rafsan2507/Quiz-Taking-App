"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GetAllQuiz } from "@/redux/TeacherSlice/TeacherSlice";
import {
  Activation,
  findActivation,
  getLastActivation,
  postActivation,
} from "@/redux/ActivationSlice/ActivationSlice";

type Props = {};

const ShowCreatedQuizzes = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [activationState, setActivationState] = useState<{
    [key: string]: boolean;
  }>({});

  const activatedQuiz = useSelector((state: RootState) => state.activation);
  const quizList = useSelector((state: RootState) => state.addQuizInfo.quizzes);

  useEffect(() => {
    dispatch(getLastActivation());
    dispatch(GetAllQuiz());
  }, [dispatch]);

  useEffect(() => {
    if (activatedQuiz.quizId) {
      setActivationState((prev) => ({
        ...prev,
        [activatedQuiz.quizId]: activatedQuiz.activate,
      }));
    }
  }, [activatedQuiz]);

  const handleCreateQuiz = () => {
    router.push("/teacher/createQuiz");
  };

  const handleActivateQuiz = async (id: string | undefined) => {
    if (typeof id === "string") {
      const currentActivationState = activationState[id] || false;
      const newActivationState = !currentActivationState;

      setActivationState((prev) => ({
        ...prev,
        [id]: newActivationState,
      }));

      const activated: Activation = {
        activate: newActivationState,
        quizId: id,
      };
      await dispatch(postActivation(activated));

      dispatch(findActivation(id));
    }
  };

  const handleEditClick = (id: string | undefined) => {
    if(typeof id === "string"){
        router.push(`/teacher/updateQuiz/${id}`)
    }

  }

  return (
    <div className="bg-[#fffaf6] h-[100vh] overflow-auto">
      <div className="flex mt-12 justify-between items-center">
        <div className="w-fit ml-12 p-6 text-2xl font-semibold bg-[#fc5185] text-white">
          Teacher
        </div>
        <div className="mr-24">
          <Button
            className="px-8 py-6 text-lg border-2 font-semibold rounded-lg border-[#fc5185] text-black bg-white hover:bg-[#fc5185] hover:text-white"
            onClick={handleCreateQuiz}
          >
            Create Quiz <FaPlus />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-6 mx-12">
        {quizList.map((quiz) => (
          <Card className="w-[350px]" key={quiz.id}>
            <CardHeader>
              <CardTitle>Title: {quiz.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Duration : {quiz.duration} minutes</div>
              <div className="flex justify-between mt-6">
                <div>
                  <Button className="bg-[#fc5185] text-white font-semibold hover:bg-[#db4773]">
                    View
                  </Button>
                </div>
                <div>
                  <Button className="bg-[#fc5185] text-white font-semibold hover:bg-[#db4773]" onClick={()=>handleEditClick(quiz.id)}>
                    Edit
                  </Button>
                </div>
                <div>
                  <Button
                    className="bg-[#fc5185] text-white font-semibold hover:bg-[#db4773]"
                    onClick={() => handleActivateQuiz(quiz.id)}
                  >
                    {activationState[quiz.id!] ? "Deactivate" : "Activate"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowCreatedQuizzes;
