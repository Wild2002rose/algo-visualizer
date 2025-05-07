import React from "react";

const VisualArray = ({ array, compared, found }) => {
  return (
    <div className="flex items-end justify-center w-full mr-24">
      {array.map((value, index) => {
        const isCompared = compared.includes(index);
        const isFound = index === found;

        let bgColor = "bg-gray-400";
        if (isFound) bgColor = "bg-green-500";
        else if (isCompared) bgColor = "bg-red-500";

        return (
          <div
            key={index}
            className={`w-1.5 mx-0.5 ${bgColor}`}
            style={{
              height: `${value * 2}px`,
              transition: "all 0.3s ease-in-out",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default VisualArray;
