import React, { useEffect, useState } from "react";
import { MatrixCard } from "./MatrixCard";
import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../../config/firebase";

export default function MatrixLists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState(""); // Single search criterion
  const [filteredMatrices, setFilteredMatrices] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [employees, setEmployees] = useState([]); // To store employee data

  // Fetch matrix data from Firestore
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

  // Fetch employee data (names and IDs)
  useEffect(() => {
    const employeesCollectionRef = collection(db, "employees");

    const unsubscribe = onSnapshot(employeesCollectionRef, (snapshot) => {
      const employeeList = [];
      snapshot.forEach((doc) => {
        employeeList.push({ id: doc.id, ...doc.data() }); // Assuming employee document has name and id fields
      });
      setEmployees(employeeList);
    });

    return () => unsubscribe();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    if (searchBy === "MainEmployees" && searchQuery) {
      // Same logic for MainEmployees search
      const matchedEmployees = employees.filter((emp) =>
        emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchedEmployees.length > 0) {
        const results = matrix.filter((matrixItem) => {
          const mainEmployees = matrixItem.MainEmployees || [];
          return (
            Array.isArray(mainEmployees) &&
            matchedEmployees.some((emp) =>
              mainEmployees.includes(emp.employeeId)
            )
          );
        });

        setFilteredMatrices(results);
      } else {
        setFilteredMatrices([]);
      }
    } else if (searchBy === "jobTitle" && searchQuery) {
      // Use filter to get all employees matching the job title search query
      const matchedEmployeesByJobTitle = employees.filter((emp) =>
        emp.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchedEmployeesByJobTitle.length > 0) {
        // Search in the matrix where any of the matched employees' IDs are in the MainEmployees field
        const results = matrix.filter((matrixItem) => {
          const mainEmployees = matrixItem.MainEmployees || []; // Ensure MainEmployees is an array

          // Check if MainEmployees is an array and contains any employee from the matchedEmployeesByJobTitle array
          return (
            Array.isArray(mainEmployees) &&
            matchedEmployeesByJobTitle.some((emp) =>
              mainEmployees.includes(emp.employeeId)
            )
          );
        });

        setFilteredMatrices(results);
      } else {
        setFilteredMatrices([]);
      }
    } else if (searchBy && searchQuery) {
      const results = matrix.filter((matrixItem) => {
        const value = matrixItem[searchBy];

        if (Array.isArray(value)) {
          return value.some((item) =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });

      setFilteredMatrices(results);
    }
  };

  // Handle the selection of search criteria
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value); // Set only one search criterion at a time
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
      <div className="search flex xs:flex-col md:flex-row xs:items-center xs:gap-y-4 md:gap-y-0 justify-center mt-9">
        {/* Select what to search by */}
        <select
          value={searchBy}
          onChange={handleSearchByChange} // Single selection
          className="w-40 p-2 rounded-md text-gray-700"
        >
          <option value="" disabled>
            اختر معيار البحث
          </option>
          <option value="title">البحث عن طريق المصفوفة</option>
          <option value="companyName">البحث عن طريق الجهة</option>
          <option value="subjects">البحث عن طريق الصلاحيات</option>
          <option value="MainEmployees">البحث عن طريق اسم الموظف</option>
          <option value="jobTitle">البحث عن طريق المسمى الوظيفى</option>
        </select>

        <input
          type="text"
          placeholder="بحث عن مصفوفة"
          className="xs:w-72 sm:w-96 rounded-full text-right ml-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={!searchBy} // Disable input until a search criterion is selected
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

      {/* Display selected search criterion */}
      <div className="mt-2 text-center">
        {searchBy && (
          <div className="inline-block bg-gray-200 p-2 rounded-md">
            <strong>بحث عن طريق:</strong> {searchBy}
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
