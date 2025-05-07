import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IoIosArrowForward } from "react-icons/io";
import { FaPlay } from 'react-icons/fa'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {useState,useEffect, useRef} from "react";
import { motion, AnimatePresence, transform } from "framer-motion";
import GraphDisplay from "./GraphDisplay";
import VisualArray from "./VisualArray";

const algorithmData = {
    Sorting: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort", "Insertion Sort"],
    Searching: ["Linear Search", "Binary Search"],
};

const algorithmCategories = [
    "Sorting Algorithm",
    "Searching Algorithm",
    "Linked List Algorithm",
    "Stack Algorithm",
    "Queue Algorithm"
  ];
  

const bubbleSort = async (arr, updateGraph, setCompared, setSorted) => {
    const sorted = new Set();
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            setCompared([j, j + 1]);
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                updateGraph([...arr]);
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
        sorted.add(arr.length - i - 1);
        setSorted([...sorted]);
    }
    setCompared([]);
};


const quickSort = async (arr, updateGraph, setCompared, setSorted) => {
    const sorted = new Set();
  
    const partition = async (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        setCompared([j, high]);
        await new Promise(res => setTimeout(res, 100));
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          updateGraph([...arr]);
          await new Promise(res => setTimeout(res, 100));
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      updateGraph([...arr]);
      await new Promise(res => setTimeout(res, 100));
      return i + 1;
    };
  
    const quickSortHelper = async (arr, low, high) => {
      if (low < high) {
        const pi = await partition(arr, low, high);
        sorted.add(pi);
        setSorted([...sorted]);
        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
      }
    };
  
    await quickSortHelper(arr, 0, arr.length - 1);
    setSorted([...Array(arr.length).keys()]);
    setCompared([]);
  };
  
const mergeSort = async (arr, updateGraph, setCompared, setSorted) => {
    const sortedIndices = new Set();
  
    const merge = async (left, mid, right) => {
      const leftPart = arr.slice(left, mid + 1);
      const rightPart = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;
  
      while (i < leftPart.length && j < rightPart.length) {
        setCompared([k]);
        await new Promise(res => setTimeout(res, 100));
        if (leftPart[i] <= rightPart[j]) {
          arr[k++] = leftPart[i++];
        } else {
          arr[k++] = rightPart[j++];
        }
        updateGraph([...arr]);
      }
  
      while (i < leftPart.length) {
        arr[k++] = leftPart[i++];
        updateGraph([...arr]);
        await new Promise(res => setTimeout(res, 100));
      }
      while (j < rightPart.length) {
        arr[k++] = rightPart[j++];
        updateGraph([...arr]);
        await new Promise(res => setTimeout(res, 100));
      }
  
      for (let x = left; x <= right; x++) sortedIndices.add(x);
      setSorted([...sortedIndices]);
    };
  
    const mergeSortHelper = async (left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(left, mid);
        await mergeSortHelper(mid + 1, right);
        await merge(left, mid, right);
      }
    };
  
    await mergeSortHelper(0, arr.length - 1);
    setSorted([...Array(arr.length).keys()]);
    setCompared([]);
  };

const selectionSort = async (arr, updateGraph, setCompared, setSorted) => {
    const sorted = new Set();
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        setCompared([minIdx, j]);
        await new Promise(res => setTimeout(res, 100));
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        updateGraph([...arr]);
        await new Promise(res => setTimeout(res, 100));
      }
      sorted.add(i);
      setSorted([...sorted]);
    }
    setCompared([]);
  };


const insertionSort = async (arr, updateGraph, setCompared, setSorted) => {
    const sorted = new Set();
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      while (j >= 0 && arr[j] > key) {
        setCompared([j, j + 1]);
        arr[j + 1] = arr[j];
        j--;
        updateGraph([...arr]);
        await new Promise(res => setTimeout(res, 100));
      }
      arr[j + 1] = key;
      updateGraph([...arr]);
      sorted.add(i);
      setSorted([...sorted]);
    }
    setSorted([...Array(arr.length).keys()]);
    setCompared([]);
  };
  
const linearSearch = async (arr, target, updateGraph, setCompared, setFound) => {
    for (let i = 0; i < arr.length; i++) {
      setCompared([i]);                     // highlight the current index
      await new Promise(res => setTimeout(res, 300));
  
      if (arr[i] === target) {
        setFound(i);                        // highlight found index
        setCompared([]);
        return;
      }
    }
    setCompared([]); // clear after not found
  };

const binarySearch = async (arr, target, updateGraph, setCompared, setFound) => {
    let low = 0;
    let high = arr.length - 1;
  
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      setCompared([mid]);                  // highlight mid
      await new Promise(res => setTimeout(res, 400));
  
      if (arr[mid] === target) {
        setFound(mid);
        setCompared([]);
        return;
      } else if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  
    setCompared([]);
  };
  
  

  const complexityData = {
    "Bubble Sort": {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    "Quick Sort": {
      best: "O(nlog n)",
      average: "O(nlogn)",
      worst: "O(n²)"
    },
    "Merge Sort": {
      best: "O(nlog n)",
      average: "O(nlogn)",
      worst: "O(nlogn)"
    },
    "Selection Sort": {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    "Insertion Sort": {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    "Binary Search": {
        best: "O(1)",
        average: "O(logn)",
        worst: "O(logn)"
    },
    "Linear Search": {
        best: "O(1)",
        average: "O(n)",
        worst: "O(n)"
    }
  };

  const descriptionMap = {
    "Bubble Sort": "Bubble Sort is a simple comparison-based algorithm that repeatedly steps through the list.It compares adjacent elements and swaps them if they are in the wrong order. This process continues until no more swaps are needed, which means the list is sorted.Though easy to understand, it is not efficient for large datasets.",
    "Quick Sort": "Quick Sort is a highly efficient sorting algorithm that follows the divide-and-conquer approach.It selects a pivot element, then partitions the array into two sub-arrays — one with elements smaller than the pivot, and one with elements larger.These sub-arrays are sorted recursively. It performs well in practice and is often faster than other sorting algorithms.",
    "Merge Sort": "Merge Sort also uses the divide-and-conquer method by breaking down the array into halves until each sub-array contains a single element.Then it merges those sub-arrays in a sorted manner. This algorithm guarantees consistent performance and is preferred for sorting large datasets, especially when stability is important.",
    "Selection Sort": "Selection Sort works by repeatedly finding the smallest (or largest) element from the unsorted section of the array and moving it to the correct position.It maintains two subarrays: a sorted one and an unsorted one.Although it's easy to implement, it performs poorly on large lists due to its quadratic time complexity.",
    "Insertion Sort": "Insertion Sort builds the sorted array one element at a time by comparing the current element with those already sorted.It inserts each new element into its correct position, much like how you sort playing cards in your hand.This algorithm is efficient for small datasets and mostly-sorted arrays.",
    "Linear Search": "Linear Search checks each element in the list one by one until the desired value is found or the list ends. It’s the simplest searching technique, useful for small or unsorted datasets.",
    "Binary Search": "Binary Search is a fast search algorithm that works on sorted arrays by repeatedly dividing the search interval in half. If the target is less than the middle element, it searches the left half; otherwise, it searches the right half."
  };
  
  
  

function SelectAlgo() {

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const ulRef = useRef(null);
    const [currentGroup, setCurrentGroup] = useState("Sorting");
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentList = algorithmData[currentGroup];
    const scrollAmount = 15;
    const numbers = [1,2,3,4,5];
    const [showNumbers , setShowNumbers] =useState(false);
    const [showAlgo, setShowAlgo] = useState(false);
    const [selectAlgo, setSelectAlgo] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [array, setArray] = useState([30,10,50,20,40]);
    const [isSorting, setIsSorting] = useState(false);
    const [comparedIndices, setComparedIndices] = useState([]);
    const [sortedIndices, setSortedIndices] = useState([]);
    const selectedAlgorithm = currentList[currentIndex];
    const description = descriptionMap[selectedAlgorithm] || "No description available.";
    const complexity = complexityData[selectedAlgorithm] || {
    best: "N/A",
    average: "N/A",
    worst: "N/A"
    };
    const [compared, setCompared] = useState([]);
    const [found, setFound] = useState(null);


    useEffect(() => {
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
        if(ulRef.current){
            ulRef.current.scrollTop -= scrollAmount;
        }
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < currentList.length - 1 ? prev + 1 : prev));
        if(ulRef.current){
            ulRef.current.scrollTop += scrollAmount;
        }
    };

    const handleGroupSwitch = () => {
        const newGroup = currentGroup === "Sorting" ? "Searching" : "Sorting";
        setCurrentGroup(newGroup);
        setCurrentIndex(0);
    };

    const algorithmMap = {
        "Bubble Sort": bubbleSort,
        "Quick Sort": quickSort,
        "Merge Sort": mergeSort,
        "Selection Sort": selectionSort,
        "Insertion Sort": insertionSort,
      };

    const handlePlayClick = async () => {
        setShowGraph(true);
        setIsSorting(true);
        const selectedAlgo = currentList[currentIndex];
        if(currentGroup === "Sorting"){
            const sortFunction = algorithmMap[selectedAlgo];
            if(sortFunction){
                await sortFunction([...array], setArray, setComparedIndices,setSortedIndices);
            }
        }else if (currentGroup === "Searching"){
            const searchFunction = selectedAlgo === "Linear Search" ? linearSearch : binarySearch;
            const target = array[Math.floor(Math.random() *array.length)];
            const sortedArray = [...array].sort((a,b) => a-b);

            await searchFunction(
                selectedAlgo === "Binary Search" ? sortedArray : array,
                target,
                setArray,
                setCompared,
                setFound
            );
        }
    };
      
    useEffect(() => {
        const randomArray = Array.from({length:50}, () => Math.floor(Math.random() * 100) +1);
        setArray(randomArray);
    }, []);

    return(
        <div className="bg-cover bg-center h-screen w-full " style={{ backgroundImage: "url('/bg1.jpg')", opacity: 0.9}}>
        <nav className="flex  justify-start ">

            <div className="p-2 border border-gray-2 justify-between bg-white">
            <Bars3Icon className="bg-transparent cursor-pointer h-14 w-14 ml-2"/>
            </div>

            <div className="p-2 flex border border-gray-2 w-full justify-between">

            <h1 className = "font-bold text-3xl mt-2 text-white ml-2" >CRACK<span className="font-normal">IT</span></h1>

            <div ref ={dropdownRef}>
            <button className="px-4 py-3 border border-gray-2 mr-10 drop mt-1 rounded-lg cursor-pointer flex gap-4  items-center"
            onClick={() => setOpen(!open)}>
                <h1 className="ml-28 hover:font-semibold bg-transparent text-white">SELECT ALGORITHM</h1>
                <ChevronDownIcon className="h-5 w-4 text-white"/>
            </button>

            </div>

            </div>
        </nav>

        <div className="bg-transparent container text-white flex gap-2">

            <div className="bg-transparent w-20 p-2 ml-1" style={{ position: "relative",
                ...( showNumbers && {borderRight: '1px solid rgba(255, 255, 255, 0.5)'}), }}>
                {showNumbers && ( 
                <div className="grid gap-30 overflow-y-scroll menubar transition-transform duration-700 ease-in-out"
                style={{
                    scrollbarWidth: "none",        
                    msOverflowStyle: "none",}}>

                {numbers.map((num, idx) => (
                <button
                    key={idx}
                    className={`bg-white text-black h-10 w-10 ml-2 rounded-full mt-10 flex items-center justify-center font-bold text-lg ${
                    idx === currentIndex ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => {
                    if (idx < currentList.length) {
                        setCurrentIndex(idx);
                        ulRef.current?.scrollTo({ top: idx * 40, behavior: 'smooth' }); // optional scroll into view
                    }
                    }}
                >
                    {num}
                </button>
                ))}


                </div>
                )}
            </div>

            <div className="grid">

                <div className="flex">
                
                {!showAlgo  ? (
                <div>
                    <h3 className="font-semibold text-lg text-white mt-16 ml-20">DATA STRUCTURE ALGORITHM VISUALIZER</h3>
                    <h1 className="font-bold text-8xl text-white ml-20 mt-8">Let's kick start your <br/>coding with us! <br/>Don't wait!</h1>
                    <button className="bg-white h-14 w-60 text-gray-700 font-normal cursor-pointer hover:font-bold ml-20 mt-10 rounded-md" 
                    onClick={() => {setShowNumbers(true);
                        setShowAlgo(true);}
                    }>Let's Start</button>
                </div> 
                 
                ) : (
                    <div className="algo-container flex gap-20 ml-10">
                        
                        <div className="border  h-80 mt-10 name rounded-lg flex gap-10 ">

                            <div className="def">
                            <h1 className=" px-10 py-4 font-semibold text-lg">
                                {currentGroup} Algorithm
                                <span className="px-2">/</span>
                                <span className="font-bold text-2xl text-blue-300">{currentList[currentIndex]}</span>
                            </h1>
                            <p className="px-10 py-6 items-center">
                                {description}
                            </p>
                            </div>

                            <div className=" w-60">
                                <h1 className="font-semibold text-lg px-12 py-6">Time Complexity</h1>
                                <ul className="h-60 px-4 py-2 ">
                                    <li className="h-10 shadow-lg bg-gray-200 rounded-lg text-black font-semibold mt-4">
                                        <h3 className="px-4 py-2">Best case : {complexity.best} </h3>
                                    </li>
                                    <li className="h-10 shadow-lg bg-gray-200 rounded-lg text-black font-semibold mt-6">
                                        <h3 className="px-4 py-2">Average case : {complexity.average} </h3>
                                    </li>
                                    <li className="h-10 shadow-lg bg-gray-200 rounded-lg text-black font-semibold mt-6">
                                        <h3 className="px-4 py-2">Worst case : {complexity.worst} </h3>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className=" h-80 mt-10  w-60 items-center">
                        
                        <div className="relative mt-24 ml-20">
                            <span className="absolute inset-0 rounded-full "></span>
                                <button
                                className="relative w-20 h-20 rounded-full bg-white 
                                hover:bg-opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg
                                transform hover:scale-110 shadow-xl ring-2 ring-white/40 z-10 hover:animate-bounce"
                                onClick = {handlePlayClick}
                                >
                                <FaPlay className="text-black w-6 h-6 ml-1" />
                                </button>
                        </div>

                        </div>

                        
                        
                    </div>
                )}
                

                {showGraph && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[600px] h-[400px] shadow-2xl relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
                            onClick={() => setShowGraph(false)}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-center text-black">Algorithm Visualization</h2>
                        <div className="border border-gray-400 flex items-center justify-center rounded-md graph">
                            currentGroup === "Sorting" ? (
                            <GraphDisplay array={array} 
                            comparedIndices={comparedIndices}
                            sortedIndices={sortedIndices}/>
                            ) : (
                                <VisualArray
                                array={array}
                                compared={compared}
                                found={found}/>
                            )
                        </div>
                        
                    </div>
                </div>
                )}

                </div>

                <div className="bg-transparent">
                    <div className="bg-transparent block text-black flex">
                        
                        <div className="w-24 grid bg-white rounded-l-lg ">

                            <div className="items-center px-10 py-12 shadow-lg  cursor-pointer hover:bg-gray-100 hover:rounded-l-lg"
                            onClick={handlePrev}><FaArrowLeft className="text-2lg font-semibold text-gray-600 hover:font-bold hover:text-black"/>
                            </div>
                            <div className="items-center px-10 py-12 shadow-lg cursor-pointer hover:bg-gray-100 hover:rounded-l-lg"
                            onClick={handleNext}><FaArrowRight className="text-2lg font-semibold text-gray-600 hover:font-bold hover:text-black"/>
                            </div>

                        </div>

                        <div className ="ml-2 w-64 bg-gray-200">
                            <h1 className="text-black font-semibold text-lg px-10 py-2">{currentGroup} Algorithm</h1>
                            <ul 
                            ref={ulRef}
                            className="bg-transparent ml-10 mr-10 mt-2 h-40 overflow-y-scroll pr-2 "
                            style={{
                                scrollbarWidth: "none",        
                                msOverflowStyle: "none",}}
                            >
                                {currentList.map((algo, index) => ( 
                                <li 
                                key={index}
                                className={`shadow-lg text-lg w-full h-10 flex items-center px-4 mb-1 rounded-md ${
                                index === currentIndex ? "bg-blue-200 font-semibold" : "bg-white hover:bg-gray-100"}`} >
                                    {algo}
                                </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white w-28 hover:bg-gray-300 cursor-pointer rounded-r-lg" onClick={handleGroupSwitch}>
                        <FaArrowRight className="text-2lg font-semibold text-gray-600 hover:font-bold hover:text-black ml-10 mt-24 cursor-pointer "/>
                        </div>
                    </div>
                </div>

                

            </div>

        </div>

        
        </div>
    )
}
export default SelectAlgo;