import React from "react";
import BadgeTitle from "../title/BadgeTitle";
import StepBadge from "@components/badge/StepBadge";

interface RecipeStepsProps {
  steps: StepType[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  return (
    <div className="grid gap-5">
      <BadgeTitle type="step" title="조리 순서" />
      {steps.map((step, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <StepBadge step={index + 1} />
          <div className="flex  w-full gap-3">
            <div className={`${step.image ? "w-[75%]" : ""}`}>{step.step}</div>
            <div>
              {step.image && (
                <img src={step.image} className="w-[110px] h-[110px] rounded-[10px]" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeSteps;