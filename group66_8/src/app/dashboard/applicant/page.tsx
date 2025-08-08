"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import Check from "./icons/Check";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const userName = "John";
  const percentComplete = 75;
  return (
    <div className="w-[1280px] m-auto">
      <div>
        <Card className="bg-gray-100 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Welcome, {userName}!
            </CardTitle>
            <CardDescription>
              Your journey to a global tech career starts now.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="h-[611.5px] m-auto flex w-[1216] gap-x-6">
        <Card className="pl-4 r-4  text-white bg-[linear-gradient(to_right,_#6366F1,_#9333EA)] h-[212px] flex-2">
          <CardHeader className="p-2 text-white">
            <CardTitle className="text-xl font-bold">
              G7 November Intake
            </CardTitle>
            <CardDescription className="text-white">
              {" "}
              It's time to submit your application and show us your potential.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2 items-start">
            <Button
              type="submit"
              onClick={() => {
                router.push("/dashboard/applicant/apply");
              }}
              className="bg-white text-[#4F46E5] p-5 border-none outline-none hover:bg-[#ffffffe2] transition-colors"
            >
              Start Application
            </Button>
          </CardFooter>
        </Card>
        <div className="flex flex-col flex-1 gap-y-4 min-h-0">
          <Card
            className="flex-1 flex flex-col"
            style={{
              backgroundColor: "#ffffff",
              boxShadow:
                "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
            }}
          >
            <CardHeader>
              <CardTitle className="pb-1 font-bold text-lg">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="flex flex-col gap-2 font-semibold text-[#4F46E5]">
                <p className="bg-[#C7D2FE] w-fit px-2 py-1.5 rounded-3xl">
                  {percentComplete}% COMPLETE
                </p>
                <div>
                  <Progress
                    className="[&>div]:bg-[#6366F1] bg-[#C7D2FE]"
                    value={percentComplete}
                  />
                </div>
                <CardFooter className="p-0">
                  <div className="flex items-center font-semibold ">
                    Go to profile
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </CardFooter>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="flex-[2] flex flex-col"
            style={{
              backgroundColor: "#ffffff",
              boxShadow:
                "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
            }}
          >
            <CardHeader className="flex flex-col flex-1">
              <CardTitle className="pb-1 font-bold text-lg">
                Application Checklist
              </CardTitle>
              <CardDescription className="flex flex-1 flex-col justify-between">
                <div className="flex items-center">
                  <Check />
                  <p className="pl-2">Create an Account</p>
                </div>
                <div className="flex items-center">
                  <Check />
                  <p className="pl-2">Fill Personal information</p>
                </div>
                <div className="flex items-center">
                  <Check />
                  <p className="pl-2">Submit Coding Profiles</p>
                </div>
                <div className="flex items-center">
                  <Check />
                  <p className="pl-2">Write Essays</p>
                </div>
                <div className="flex items-center">
                  <Check />
                  <p className="pl-2">Upload Resume</p>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card
            className="flex-1 flex flex-col"
            style={{
              backgroundColor: "#ffffff",
              boxShadow:
                "0px 8px 10px -6px rgba(0,0,0,0.10), 0px 20px 25px -5px rgba(0,0,0,0.10)",
            }}
          >
            <CardHeader>
              <CardTitle className="font-bold text-lg">
                Helpful Resources
              </CardTitle>
              <CardFooter className="flex flex-col items-start p-0">
                <Button
                  variant="link"
                  className="text-[#4F46E5] p-0 hover:no-underline"
                >
                  Tips for a Great Application
                </Button>
                <Button
                  variant="link"
                  className="text-[#4F46E5] p-0 hover:no-underline"
                >
                  A2SV Problem Solving Guide
                </Button>
              </CardFooter>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
