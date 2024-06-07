import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  onSubmit: (name: string, gender: string, age: number, pushConsent: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleCloseModal, onSubmit }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [pushConsent, setPushConsent] = useState(false);
  const [warning, setWarning] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !gender || !age) {
      setWarning("모두 다 입력해주세요...");
      return;
    }
    const ageNumber = parseInt(age, 10); //문자열 정수(10진수)로 변환
    if (isNaN(ageNumber)) {
      setWarning("나이는 숫자로 입력해주세요.");
      return;
    }
    onSubmit(name, gender, ageNumber, pushConsent);
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[280px] max-w-sm mx-auto">
        <h2 className="text-xl mb-4">정보 입력</h2>
        <div className="mb-4 text-sm">
          <label className="block mb-1">이름:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 text-sm">
          <label className="block mb-1">성별:</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 text-sm">
          <label className="block mb-1">나이:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4 text-[12px]">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={pushConsent}
              onChange={(e) => setPushConsent(e.target.checked)}
              className="mr-2"
            />
            <span>알림 push 동의하시겠습니까?(선택)</span>
          </label>
        </div>
        {warning && <p className="text-red-500 text-sm">{warning}</p>}
        <div className="flex justify-end mt-5">
          <button onClick={handleCloseModal} className="mr-4 py-2 px-3 bg-gray-200 rounded">
            취소
          </button>
          <button onClick={handleSubmit} className="py-2 px-3 bg-redPink text-white rounded">
            제출
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;