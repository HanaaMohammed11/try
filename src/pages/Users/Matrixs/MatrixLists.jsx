/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MatrixCard } from "./MatrixCard";
import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../../config/firebase";

export default function MatrixLists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState(""); // To track selected search option
  const [filteredMatrices, setFilteredMatrices] = useState([]); // Assuming you have a list of matrices
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "matrix");

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const matrix = [];
      snapshot.forEach((doc) => {
        matrix.push({ id: doc.id, ...doc.data() });
      });
      setMatrix(matrix);
      setFilteredMatrices(matrix);
    });

    return () => unsubscribe();
  }, []);

  // Handle search functionality based on the selected criterion
  const handleSearch = () => {
    if (searchBy && searchQuery) {
      const results = matrix.filter((matrix) =>
        matrix[searchBy].toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMatrices(results);
    }
  };

  // Clear filters and reset the matrices
  const handleClearFilters = () => {
    setSearchQuery(""); // Clear search query
    setSearchBy(""); // Clear selected search criterion
    setFilteredMatrices(matrix); // Reset filtered matrices to the full list
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top banner with centered title */}
      <div className="relative flex justify-center items-center text-center">
        <Topbanner />
        <h1
          className="absolute top-16 text-6xl font-semibold text-gray-700"
          style={{ fontFamily: "cursive" }}
        >
          المصفوفات
        </h1>
      </div>

      {/* Input search section */}
      <div className="search flex justify-center mt-9">
        {/* Select what to search by */}
        <select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          className="w-40 p-2 rounded-md text-gray-700"
        >
          <option value="" disabled>
            اختر معيار البحث
          </option>
          <option value="title">البحث عن طريق المصفوفة</option>
          <option value="companyName">البحث عن طريق الجهة</option>
          <option value="subjects">البحث عن طريق الصلاحيات</option>
          <option value="employees">البحث عن طريق الموظفين</option>
        </select>

        <input
          type="text"
          placeholder="بحث عن مصفوفة"
          className="w-96 rounded-full text-right ml-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={!searchBy} // Disable input until search criterion is selected
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 text-white"
        >
          بحث
        </button>
        <button
          onClick={handleClearFilters} // Clear filters when button is clicked
          className="ml-2 px-4 py-2 rounded-full bg-red-500 text-white"
        >
          مسح الفلاتر
        </button>
      </div>

      {/* Main content section */}
      <div className="flex-grow">
        {/* Pass filtered matrices to MatrixCard */}
        <MatrixCard matrices={filteredMatrices} />
      </div>

      {/* Bottom banner always at the bottom */}
      <div className="mt-auto">
        <Bottombanner />
      </div>
    </div>
  );
}
