import React from "react";
import BadgeTitle from "../title/BadgeTitle";
import BigButton from "@components/buttons/BigButton";

interface PreparedIngredientsProps {
  ingredients: IngredientType[];
}

const PreparedIngredients: React.FC<PreparedIngredientsProps> = ({ ingredients }) => {
  const previewIngredients = ingredients.slice(0, 4);
  const moreIngredients = ingredients.slice(0, 4);

  return (
    <div className="grid gap-5">
      <div className="flex items-center justify-between ">
        <BadgeTitle type="forkKnife" title="준비 재료" />
        <div>
          <span className="text-redPink">{ingredients.length}</span> 개
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="border-2 border-lightBeige rounded-[5px] w-[98%] h-auto p-3">
          {previewIngredients.map((ingredient) => (
            <div className="flex justify-between" key={ingredient.id}>
              <span>{ingredient.name}</span>
              <div>
                <span>{ingredient.quantity}</span> {ingredient.unit}
              </div>
            </div>
          ))}
        </div>
        <div className="w-[98%]">
          <BigButton buttonText="재료 더 보기" />
        </div>
      </div>
    </div>
  );
};

export default PreparedIngredients;
