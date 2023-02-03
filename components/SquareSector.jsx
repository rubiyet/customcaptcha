import React, { useEffect, useState, useMemo } from "react";

export default function SquareSector({ captured, func, validation,validationData }) {
  const [childSquareBoxNo, setChildSquareBoxNo] = useState(25); //25 is the number of child square box
  const [filledSelectorLength, setFilledSelectorLength] = useState(); //filledSelectorLength is the number of filled square box
  const [dataArr, setDataArr] = useState([]); //dataArr is the array of filled square box

  useEffect(() => {
    if (captured) {
      setFilledSelectorLength(Math.floor(Math.random() * 2) + 12); //setFilledSelectorLength is the number of filled square box
    } else {
      setFilledSelectorLength(0); //setFilledSelectorLength is the number of filled square box
      setDataArr([]); //dataArr is the array of filled square box
    }
  }, [captured]);

  useEffect(() => {
    if (dataArr.length < filledSelectorLength) {
      Array.from({ length: filledSelectorLength }, (_, i) => {
        let randomKey = Math.floor(Math.random() * 25); //random key selection from 0 to 24
        const shapes = ["triangle", "circle", "square"]; //shapes array
        const randomShapes = Math.floor(Math.random() * shapes.length); //random shape selection from shapes array
        const randomShape = shapes[randomShapes]; //random shape selection from shapes array
        const shapeColor = ["red", "green", "blue"]; //shapeColor array
        const randomShapeColor = Math.floor(Math.random() * shapeColor.length); //random shapeColor selection from shapeColor array
        const randomColor = shapeColor[randomShapeColor]; //random shapeColor selection from shapeColor array

        {/* ramdom key selection from 0 to 24 when key is already exist in dataArr array */}
        while (dataArr.some((item) => item.key === randomKey)) {
          randomKey = Math.floor(Math.random() * 25);
        }
        setDataArr([
          ...dataArr,
          { key: randomKey, shape: randomShape, color: randomColor },
        ]); //dataArr is the array of filled square box
      });
    }
  }, [filledSelectorLength, captured, dataArr]);

  const lengthOfFirstChoice = 4; //lengthOfFirstChoice is the number of first choice
  const lengthOfSecondChoice = 6; //lengthOfSecondChoice is the number of second choice
  const lengthOfThirdChoice = 8; //lengthOfThirdChoice is the number of third choice

  const [choiceKey, setChoiceKey] = useState([]); //choiceKey is the array of first choice

  useEffect(() => {
    if (dataArr.length === filledSelectorLength) {
      if (choiceKey.length < lengthOfFirstChoice) {
        Array.from({ length: lengthOfFirstChoice }, (_, i) => {
          //random key selection from dataArr array
          let randomKeys = Math.floor(Math.random() * dataArr.length); //random key selection from dataArr array
          {/* ramdom key selection from dataArr array when key is already exist in choiceKey array */}
          while (choiceKey.some((item) => item === randomKeys)) {
            randomKeys = Math.floor(Math.random() * dataArr.length);
          }

          {/*set choiceKey array with shape and color of random key selection from dataArr array */}
          dataArr.map((item, index) => {
            if (index === randomKeys) {
              if (item.shape === "triangle" && item.color === "red") {
                setChoiceKey([...choiceKey, "triangle-red"]);
              } else if (item.shape === "triangle" && item.color === "green") {
                setChoiceKey([...choiceKey, "triangle-green"]);
              } else if (item.shape === "triangle" && item.color === "blue") {
                setChoiceKey([...choiceKey, "triangle-blue"]);
              } else if (item.shape === "circle" && item.color === "red") {
                setChoiceKey([...choiceKey, "circle-red"]);
              } else if (item.shape === "circle" && item.color === "green") {
                setChoiceKey([...choiceKey, "circle-green"]);
              } else if (item.shape === "circle" && item.color === "blue") {
                setChoiceKey([...choiceKey, "circle-blue"]);
              } else if (item.shape === "square" && item.color === "red") {
                setChoiceKey([...choiceKey, "square-red"]);
              } else if (item.shape === "square" && item.color === "green") {
                setChoiceKey([...choiceKey, "square-green"]);
              } else if (item.shape === "square" && item.color === "blue") {
                setChoiceKey([...choiceKey, "square-blue"]);
              }
            }
          });
        });
      }
    }
  }, [dataArr, filledSelectorLength, choiceKey]);

  const [shapeAndCount, setShapeAndCount] = useState([]); //shapeAndCount is the array of shape and count of shape

  {/* set shapeAndCount array with shape and count of shape store in this array */}
  useEffect(() => {
    if (choiceKey.length === lengthOfFirstChoice) {
      let shapeAndCount = [];
      choiceKey.map((item) => {
        if (shapeAndCount.some((shape) => shape.shape === item)) {
          shapeAndCount.map((shape) => {
            if (shape.shape === item) {
              shape.count = shape.count + 1;
            }
          });
        } else {
          shapeAndCount.push({ shape: item, count: 1 });
        }
      });
      setShapeAndCount(shapeAndCount);
    }
  }, [choiceKey, lengthOfFirstChoice]);

  func(shapeAndCount); //func is the function which is called when shapeAndCount array is changed

  const [selectedShapesArr, setSelectedShapesArr] = useState([]); //selectedShapesArr is the array of selected shape and color

  const selectedShapes = (shape, color) => () => {
    setSelectedShapesArr([...selectedShapesArr, { shape, color }]);
  };

  const [selectedShapesMatch, setSelectedShapesMatch] = useState([]); 
  const [selectedShapesNotMatch, setSelectedShapesNotMatch] = useState([]); 

  {/* set selectedShapesMatch and selectedShapesNotMatch array with shape and color of selected shape and color store in this array */}
  useEffect(() => {
    if (selectedShapesArr.length > 0) {
        let selectedShapesMatch = [];
        let selectedShapesNotMatch = [];
        selectedShapesArr.map((item) => {
          if (choiceKey.some((shape) => shape.split('-')[0] === item.shape && shape.split('-')[1] === item.color)) {
            selectedShapesMatch.push(item);
          } else {
            selectedShapesNotMatch.push(item);
          }
        });
        setSelectedShapesMatch(selectedShapesMatch);
        setSelectedShapesNotMatch(selectedShapesNotMatch);
        console.log('selectedShapesMatch', selectedShapesMatch);
        console.log('selectedShapesNotMatch', selectedShapesNotMatch);
    }
  }, [selectedShapesArr, choiceKey]);


  useEffect(() => {
    if(validation === true) {
      if (selectedShapesNotMatch.length > 0) {
        validationData(false);
        console.log('validationData', false);
      } else if (selectedShapesMatch.length != choiceKey.length) {
        validationData(true);
        console.log('validationData', false);
      } else {
        validationData(true);
        console.log('validationData', true);
      }
    }
  }, [validation, selectedShapesNotMatch, validationData, selectedShapesMatch.length, choiceKey.length]);



  return (
    <div className="grid grid-cols-5 w-full h-full">
      {Array(childSquareBoxNo)
        .fill()
        .map((_, index) =>
          dataArr.some((item) => item.key === index) ? (
            <button
            onClick={selectedShapes(dataArr.find((item) => item.key === index).shape, dataArr.find((item) => item.key === index).color)}
              key={index}
              className="flex items-center justify-center w-full h-full border border-borderColor bg-secondaryColor bg-opacity-40 border-opacity-50 text-secondaryColor text-opacity-0 text-center"
            >
              {dataArr.some(
                (item) => item.key === index && item.shape === "triangle"
              ) ? (
                // Triangle draw using div
                <div
                  className={`w-0 h-0 border-solid  border-l-12 border-r-12 border-b-20 border-opacity-60 ${
                    dataArr.find((item) => item.key === index).color === "red"
                      ? " border-b-red"
                      : dataArr.find((item) => item.key === index).color ===
                        "green"
                      ? " border-b-green"
                      : " border-b-blue"
                  }`}
                ></div>
              ) : dataArr.some(
                  (item) => item.key === index && item.shape === "circle"
                ) ? (
                // Circle draw using div
                <div
                  className={`w-1/2 h-1/2 rounded-full bg-opacity-60 ${
                    dataArr.find((item) => item.key === index).color === "red"
                      ? " bg-red"
                      : dataArr.find((item) => item.key === index).color ===
                        "green"
                      ? " bg-green"
                      : " bg-blue"
                  }`}
                ></div>
              ) : dataArr.some(
                  (item) => item.key === index && item.shape === "square"
                ) ? (
                // Square draw using div
                <div
                  className={`w-1/2 h-1/2 bg-opacity-60 ${
                    dataArr.find((item) => item.key === index).color === "red"
                      ? " bg-red"
                      : dataArr.find((item) => item.key === index).color ===
                        "green"
                      ? " bg-green"
                      : " bg-blue"
                  }`}
                ></div>
              ) : null}
            </button>
          ) : (
            <div
              key={index}
              className="w-full h-full border border-borderColor bg-secondaryColor bg-opacity-40 border-opacity-50"
            >
              <span className="text-secondaryColor text-opacity-0">
                .
              </span>
            </div>
          )
        )}
    </div>
  );
}
