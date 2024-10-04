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
        <div
  className="text-lg font-bold mx-5 text-white "
  style={{
    backgroundImage: `url("./src/assets/WhatsApp_Image_2024-10-01_at_8.39.17_AM-removebg-preview.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "79px",
          width: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          cursor: "pointer",
          textAlign: "center",
  }}
  onClick={handleClick}
>اضافة مصفوفة </div>

          {/* Search Input */}
          <div className='search flex justify-center mt-9'>
          <input
            type="text"
            className="w-96 rounded-full text-right"
            placeholder="بحث عن مصفوفه"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
           </div>
      
     
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
