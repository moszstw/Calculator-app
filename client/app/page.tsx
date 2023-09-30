"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string) => {
    if (input === "0" && value === "0") {
      return;
    }

    if (input === "0") {
      setInput(value);
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleCalculate = async () => {
    const hasOperators = /[\+\-\*\/]/.test(input);

    if (!hasOperators) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/calculate",
        { expression: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setInput(response.data.result);
    } catch (error) {
      console.error("Error calculating:", error);
    }
  };

  return (
    <div className="calculator bg-gray-500 p-4 rounded-md max-w-md mx-auto mt-10 shadow-md">
      <div className="input-screen bg-white p-2 mb-2 text-right rounded-md">
        {input || "0"}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            key={number}
            onClick={() => handleButtonClick(number.toString())}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            {number}
          </button>
        ))}

        {["+", "-", "*", "/"].map((operation) => (
          <button
            key={operation}
            onClick={() => handleButtonClick(operation)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
          >
            {operation}
          </button>
        ))}

        <button
          onClick={handleCalculate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md col-span-2"
        >
          =
        </button>

        <button
          onClick={() => setInput("")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
        >
          C
        </button>
      </div>
    </div>
  );
}
