const Bar = ({ height, isComparing, isSorted }) => {
    let color = 'bg-blue-500';
    if (isComparing) color = 'bg-red-500';
    if (isSorted) color = 'bg-green-500';
  
    return (
      <div
        className={`w-4 mx-1 ${color}`}
        style={{ height: `${height}%`, transition: 'height 0.3s ease-in-out' }}
      />
    );
  };
  
  const GraphDisplay = ({ array, comparedIndices, sortedIndices }) => {
    return (
      <div className="flex justify-center items-end h-64 w-54 overflow-x-auto">
        {array.map((value, index) => (
          <Bar
            key={index}
            height={value}
            isComparing={comparedIndices.includes(index)}
            isSorted={sortedIndices.includes(index)}
          />
        ))}
      </div>
    );
  };
  
  export default GraphDisplay;
  