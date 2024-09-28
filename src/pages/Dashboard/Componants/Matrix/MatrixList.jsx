import { IoMdAdd } from "react-icons/io";
import MatrixForm from "./MatrixForm";
import MatrixCard from "./MatrixCard";
import { useState } from "react";

export default function MatrixList() {
  const [showMatrixForm, setShowMatrixForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  const handleClick = () => {
    setShowMatrixForm(!showMatrixForm);
  };

  return (
    <>
      <div className="flex justify-between p-9">
        <div className="flex justify-between w-full">
          <IoMdAdd
            className="bg-[#f5bc42] text-white text-6xl p-5 rounded-full"
            onClick={handleClick}
          />
          {/* Search Input */}
          <input
            type="text"
            className="text-right rounded-full p-2 border border-neutral-300 dark:border-neutral-600"
            placeholder="بحث عن مصفوفه"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </div>
      </div>

      {/* Show the form or matrix card */}
      {showMatrixForm ? (
        <MatrixForm />
      ) : (
        <MatrixCard searchQuery={searchQuery} />
      )}
    </>
  );
}
