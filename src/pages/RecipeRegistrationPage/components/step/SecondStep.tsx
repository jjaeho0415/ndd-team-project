import React, { useEffect, useState } from "react";
import IngredientInput from "../input/IngredientInput";
import SelectBox from "../selectbox/SelectBox";
import RectangularSmallButton from "@components/buttons/RectangularSmallButton";
import Label from "../Label";
import { FiMinusCircle } from "react-icons/fi";
import IngredientBox from "../ingredientbox/IngredientBox";
import { useRecipeStore } from "@store/useRecipeStore";

interface SecondStepProps {
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const SecondStep: React.FC<SecondStepProps> = ({ setIsValid }) => {
  const units = ["개", "컵", "큰술", "작은술", "티스푼", "ml", "g", "꼬집"];
  const initialIngredientData: IngredientType = {
    name: "",
    quantity: -1,
    unit: "단위",
  };
  const { recipeData, setRecipeData } = useRecipeStore();
  const [ingredients, setIngredients] = useState<IngredientType[]>(recipeData.ingredients);
  const [isDeleteButtonClick, setIsDeleteButtonClick] = useState<boolean>(false);
  const [ingredientInputIndex, setIngredientInputIndex] = useState<number | null>(null);

  const handleAddClick = () => {
    setIngredients((prev) => [...prev, initialIngredientData]);
  };

  const handleDeleteClick = () => {
    setIsDeleteButtonClick(true);
  };

  const handleCompleteClick = () => {
    setIsDeleteButtonClick(false);
  };

  const handleMinusClick = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => {
      return index !== i;
    });
    setIngredients(newIngredients);
    setRecipeData({ ...recipeData, ingredients: newIngredients });
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (index === i) {
        return { ...ingredient, [field]: value };
      } else {
        return ingredient;
      }
    });

    setIngredients(newIngredients);
    setRecipeData({ ...recipeData, ingredients: newIngredients });
  };

  useEffect(() => {
    if (ingredients.length === 1) {
      setIsDeleteButtonClick(false);
    }
  }, [ingredients]);

  return (
    <>
      <div className="flex justify-between items-center">
        <Label name="요리 재료" />
        {ingredients.length !== 1 &&
          (isDeleteButtonClick ? (
            <div className="w-[100px]">
              <RectangularSmallButton buttonText="완료" handleClick={handleCompleteClick} />
            </div>
          ) : (
            <div className="w-[100px]">
              <RectangularSmallButton buttonText="재료 삭제" handleClick={handleDeleteClick} />
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-6">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-1">
            <div
              className={`flex flex-col gap-2 ${ingredients.length === 1 || !isDeleteButtonClick ? "w-full" : "w-[420px]"}`}
            >
              <div onClick={() => setIngredientInputIndex(index)}>
                <IngredientInput
                  value={ingredient.name}
                  index={index}
                  field="name"
                  placeholder="재료명"
                  maxLength={20}
                  handleChange={handleChange}
                />
              </div>
              {/* {ingredientInputIndex === index && <IngredientBox />} */}
              <div className="flex gap-2">
                <div className="w-[50%]">
                  <IngredientInput
                    value={ingredient.quantity < 0 ? "" : ingredient.quantity}
                    index={index}
                    field="quantity"
                    placeholder="수량"
                    maxLength={20}
                    handleChange={handleChange}
                  />
                </div>
                <div className="w-[50%]">
                  <SelectBox
                    index={index}
                    field="unit"
                    options={units}
                    value={ingredient.unit}
                    handleUnitChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {ingredients.length !== 1 && isDeleteButtonClick && (
              <div
                className="flex justify-center items-center w-[50px] h-[108px]"
                onClick={() => handleMinusClick(index)}
              >
                <FiMinusCircle className="size-[24px]" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="w-[100px]">
        <RectangularSmallButton buttonText="재료 추가" handleClick={handleAddClick} />
      </div>
    </>
  );
};

export default SecondStep;