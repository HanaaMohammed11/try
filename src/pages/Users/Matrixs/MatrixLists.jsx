/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MatrixCard } from "./MatrixCard";
import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../../config/firebase";

export default function MatrixLists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState([]); // Now it's an array
  const [filteredMatrices, setFilteredMatrices] = useState([]);
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

  // Handle search functionality based on multiple selected criteria
  // Handle search functionality based on multiple selected criteria
  const handleSearch = () => {
    if (searchBy.length && searchQuery) {
      const results = matrix.filter((matrixItem) =>
        searchBy.some((criterion) => {
          const value = matrixItem[criterion];

          // Check if the field is an array or a string
          if (Array.isArray(value)) {
            // Search inside the array (e.g., subjects, employees)
            return value.some((item) =>
              item.toLowerCase().includes(searchQuery.toLowerCase())
            );
          } else if (typeof value === "string") {
            // Search inside a string field (e.g., title, companyName)
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        })
      );
      setFilteredMatrices(results);
    }
  };

  // Handle the selection of multiple search criteria
  const handleSearchByChange = (e) => {
    const value = e.target.value;
    setSearchBy(
      (prevSearchBy) =>
        prevSearchBy.includes(value)
          ? prevSearchBy.filter((criterion) => criterion !== value) // Remove if already selected
          : [...prevSearchBy, value] // Add new criterion
    );
  };

  // Clear filters and reset the matrices
  const handleClearFilters = () => {
    setSearchQuery(""); // Clear search query
    setSearchBy([]); // Clear selected search criteria
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
          value=""
          onChange={handleSearchByChange} // Allow multiple selections
          className="w-40 p-2 rounded-md text-gray-700"
        >
          <option value="" disabled>
            اختر معيار البحث
          </option>
          <option value="title">البحث عن طريق المصفوفة</option>
          <option value="companyName">البحث عن طريق الجهة</option>
          <option value="subjects">البحث عن طريق الصلاحيات</option>
          <option value="MainEmployees">البحث عن طريق الموظفين</option>
        </select>

        <input
          type="text"
          placeholder="بحث عن مصفوفة"
          className="w-96 rounded-full text-right ml-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={!searchBy.length} // Disable input until at least one search criterion is selected
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

      {/* Display selected search criteria */}
      <div className="mt-2 text-center">
        {searchBy.length > 0 && (
          <div className="inline-block bg-gray-200 p-2 rounded-md">
            <strong>بحث عن طريق:</strong> {searchBy.join(", ")}
          </div>
        )}
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
