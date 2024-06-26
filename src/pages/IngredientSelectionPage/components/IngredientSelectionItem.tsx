import React from "react";
import RectangularSmallButton from "@components/buttons/RectangularSmallButton";
import { PiHamburger } from "react-icons/pi";

interface IngredientSelectionItemProps {
  refrigerator: RefrigeratorType;
  selectAllIngredients: () => void;
  deselectAllIngredients: () => void;
  selectedIngredients: number[];
}

const IngredientSelectionItem: React.FC<IngredientSelectionItemProps> = ({
  refrigerator,
  selectAllIngredients,
  deselectAllIngredients,
  selectedIngredients,
}) => {
  const hasSelectedIngredients = selectedIngredients.length > 0;

  return (
    <div>
      <div className="flex items-center space-x-2 mt-4">
        <div className="bg-[#EBF6C1] rounded-lg w-8 h-8 flex justify-center items-center ml-6">
          <PiHamburger className="w-6 h-6" style={{ color: "#A2A38B" }} />
        </div>
        <span className="text-gray-400">{refrigerator.nickname}님의 냉장고</span>
      </div>
      <div className="mt-4 flex space-x-2 absolute right-[28px]">
        {hasSelectedIngredients && (
          <div className="transform scale-y-90">
            <RectangularSmallButton handleClick={deselectAllIngredients} buttonText={"모두 취소"} />
          </div>
        )}
        <div className="transform scale-y-90">
          <RectangularSmallButton handleClick={selectAllIngredients} buttonText={"모두 선택"} />
        </div>
      </div>
      <div className="mt-[60px] border w-full px-2 h-[3px] bg-gray-100"></div>
    </div>
  );
};

export default IngredientSelectionItem;
