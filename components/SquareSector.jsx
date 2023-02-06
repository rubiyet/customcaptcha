import { useEffect, useState } from "react"; //importing useState and useEffect from react

export default function SquareSector({
  captured,
  func,
  validation,
  validationData,
}) {
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
        const randomAngle = [12, 45, 90, 180]; //randomAngle array
        const randomAngleSelection = Math.floor(
          Math.random() * randomAngle.length
        ); //random angle selection from randomAngle array
        const randomAngleValue = randomAngle[randomAngleSelection]; //random angle selection from randomAngle array

        {
          /* ramdom key selection from 0 to 24 when key is already exist in dataArr array */
        }
        while (dataArr.some((item) => item.key === randomKey)) {
          randomKey = Math.floor(Math.random() * 25);
        }
        setDataArr([
          ...dataArr,
          {
            key: randomKey,
            shape: randomShape,
            color: randomColor,
            angle: randomAngleValue,
          },
        ]); //dataArr is the array of filled square box
      });
    }
  }, [filledSelectorLength, captured, dataArr]);

  const lengthOfFirstChoice = parseInt(
    process.env.NEXT_PUBLIC_LENGTHOFFIRSTCHOICE
  ); //lengthOfFirstChoice is the number of first choice
  const lengthOfSecondChoice = parseInt(
    process.env.NEXT_PUBLIC_LENGTHOFSECONDCHOICE
  ); //lengthOfSecondChoice is the number of second choice
  const lengthOfThirdChoice = parseInt(
    process.env.NEXT_PUBLIC_LENGTHOFTHIRDCHOICE
  ); //lengthOfThirdChoice is the number of third choice
  const [firstValidated, setFirstValidated] = useState(true); //firstValidated is the boolean value which is true when first choice is validated
  const [secondValidated, setSecondValidated] = useState(true); //secondValidated is the boolean value which is true when second choice is validated
  const [thirdValidated, setThirdValidated] = useState(true); //thirdValidated is the boolean value which is true when third choice is validated

  const [choiceKey, setChoiceKey] = useState([]); //choiceKey is the array of first choice

  useEffect(() => {
    if (
      dataArr.length === filledSelectorLength &&
      firstValidated === true &&
      secondValidated === true &&
      thirdValidated === true
    ) {
      if (choiceKey.length === 0) {
        let arr = [];
        {
          /* ramdom key selection from dataArr array when key is already exist in choiceKey array */
        }
        do {
          let randomKeys = Math.floor(Math.random() * dataArr.length);
          arr = arr.indexOf(randomKeys) > -1 ? arr : arr.concat(randomKeys);
        } while (arr.length < lengthOfFirstChoice);
        {
          /*set choiceKey array with shape and color of random key selection from dataArr array */
        }
        arr.map((a) => {
          dataArr.map((item, index) => {
            if (index === a) {
              if (item.shape === "triangle" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-red"]);
              } else if (item.shape === "triangle" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-green"]);
              } else if (item.shape === "triangle" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-blue"]);
              } else if (item.shape === "circle" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-red"]);
              } else if (item.shape === "circle" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-green"]);
              } else if (item.shape === "circle" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-blue"]);
              } else if (item.shape === "square" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-red"]);
              } else if (item.shape === "square" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-green"]);
              } else if (item.shape === "square" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-blue"]);
              }
            }
          });
        });
      }
    } else if (
      dataArr.length === filledSelectorLength &&
      firstValidated === false &&
      secondValidated === true &&
      thirdValidated === true
    ) {
      if (choiceKey.length === 0) {
        let arr = [];
        {
          /* ramdom key selection from dataArr array when key is already exist in choiceKey array */
        }
        do {
          let randomKeys = Math.floor(Math.random() * dataArr.length);
          arr = arr.indexOf(randomKeys) > -1 ? arr : arr.concat(randomKeys);
        } while (arr.length < lengthOfSecondChoice);
        {
          /*set choiceKey array with shape and color of random key selection from dataArr array */
        }
        arr.map((a) => {
          dataArr.map((item, index) => {
            if (index === a) {
              if (item.shape === "triangle" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-red"]);
              } else if (item.shape === "triangle" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-green"]);
              } else if (item.shape === "triangle" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-blue"]);
              } else if (item.shape === "circle" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-red"]);
              } else if (item.shape === "circle" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-green"]);
              } else if (item.shape === "circle" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-blue"]);
              } else if (item.shape === "square" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-red"]);
              } else if (item.shape === "square" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-green"]);
              } else if (item.shape === "square" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-blue"]);
              }
            }
          });
        });
      }
    } else if (
      dataArr.length === filledSelectorLength &&
      firstValidated === false &&
      secondValidated === false &&
      thirdValidated === true
    ) {
      if (choiceKey.length === 0) {
        let arr = [];
        {
          /* ramdom key selection from dataArr array when key is already exist in choiceKey array */
        }
        do {
          let randomKeys = Math.floor(Math.random() * dataArr.length);
          arr = arr.indexOf(randomKeys) > -1 ? arr : arr.concat(randomKeys);
        } while (arr.length < lengthOfThirdChoice);
        {
          /*set choiceKey array with shape and color of random key selection from dataArr array */
        }
        arr.map((a) => {
          dataArr.map((item, index) => {
            if (index === a) {
              if (item.shape === "triangle" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-red"]);
              } else if (item.shape === "triangle" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-green"]);
              } else if (item.shape === "triangle" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "triangle-blue"]);
              } else if (item.shape === "circle" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-red"]);
              } else if (item.shape === "circle" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-green"]);
              } else if (item.shape === "circle" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "circle-blue"]);
              } else if (item.shape === "square" && item.color === "red") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-red"]);
              } else if (item.shape === "square" && item.color === "green") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-green"]);
              } else if (item.shape === "square" && item.color === "blue") {
                setChoiceKey((choiceKey) => [...choiceKey, "square-blue"]);
              }
            }
          });
        });
      }
    }
  }, [
    dataArr,
    filledSelectorLength,
    firstValidated,
    secondValidated,
    thirdValidated,
    choiceKey,
    lengthOfFirstChoice,
    lengthOfSecondChoice,
    lengthOfThirdChoice,
  ]);

  const [shapeAndCount, setShapeAndCount] = useState([]); //shapeAndCount is the array of shape and count of shape

  {
    /* set shapeAndCount array with shape and count of shape store in this array */
  }
  useEffect(() => {
    {/* setShapeAndCount array with shape and count of shape store in this array */ }
    if (choiceKey.length === lengthOfFirstChoice && firstValidated === true) {
      let shapeAndCount = [];
      choiceKey.map((item) => {
        if (shapeAndCount.some((shape) => shape.shape === item)) {
          shapeAndCount.map((shape) => {
            if (shape.shape === item) {
              shape.count = shape.count + 1; //shapeAndCount is the array of shape and count of shape
            }
          });
        } else {
          shapeAndCount.push({ shape: item, count: 1 }); //shapeAndCount is the array of shape and count of shape
        }
      });
      setShapeAndCount(shapeAndCount);
    } else if (
      choiceKey.length === lengthOfSecondChoice &&
      firstValidated === false &&
      secondValidated === true
    ) {
      let shapeAndCount = [];
      choiceKey.map((item) => {
        if (shapeAndCount.some((shape) => shape.shape === item)) {
          shapeAndCount.map((shape) => {
            if (shape.shape === item) {
              shape.count = shape.count + 1; //shapeAndCount is the array of shape and count of shape
            }
          });
        } else {
          shapeAndCount.push({ shape: item, count: 1 }); //shapeAndCount is the array of shape and count of shape
        }
      });
      setShapeAndCount(shapeAndCount);
    } else if (
      choiceKey.length === lengthOfThirdChoice &&
      firstValidated === false &&
      secondValidated === false &&
      thirdValidated === true
    ) {
      let shapeAndCount = [];
      choiceKey.map((item) => {
        if (shapeAndCount.some((shape) => shape.shape === item)) {
          shapeAndCount.map((shape) => {
            if (shape.shape === item) {
              shape.count = shape.count + 1; //shapeAndCount is the array of shape and count of shape
            }
          });
        } else {
          shapeAndCount.push({ shape: item, count: 1 }); //shapeAndCount is the array of shape and count of shape
        }
      });
      setShapeAndCount(shapeAndCount);
      console.log("shapeAndCount", shapeAndCount);
    }
  }, [choiceKey, lengthOfFirstChoice, firstValidated, secondValidated, thirdValidated, lengthOfSecondChoice, lengthOfThirdChoice]);


  func(shapeAndCount); //func is the function which is called when shapeAndCount array is changed

  const [selectedShapesArr, setSelectedShapesArr] = useState([]); //selectedShapesArr is the array of selected shape and color

  const selectedShapes = (key, shape, color) => () => {
    setSelectedShapesArr([...selectedShapesArr, { key, shape, color }]); //selectedShapesArr is the array of selected shape and color
  };

  const [selectedShapesMatch, setSelectedShapesMatch] = useState([]); //selectedShapesMatch is the array of selected shape and color which is matched with shape and color of choiceKey
  const [selectedShapesNotMatch, setSelectedShapesNotMatch] = useState([]); //selectedShapesNotMatch is the array of selected shape and color which is not matched with shape and color of choiceKey

  {
    /* set selectedShapesMatch and selectedShapesNotMatch array with shape and color of selected shape and color store in this array */
  }
  useEffect(() => {
    if (selectedShapesArr.length > 0) {
      let selectedShapesMatch = [];
      let selectedShapesNotMatch = [];
      selectedShapesArr.map((item) => {
        if (
          choiceKey.some(
            (shape) =>
              shape.split("-")[0] === item.shape &&
              shape.split("-")[1] === item.color
          )
        ) {
          selectedShapesMatch.push(item);
        } else {
          selectedShapesNotMatch.push(item);
        }
      });
      setSelectedShapesMatch(selectedShapesMatch);
      setSelectedShapesNotMatch(selectedShapesNotMatch);
    }
  }, [
    selectedShapesArr,
    choiceKey,
    lengthOfFirstChoice,
    lengthOfSecondChoice,
    lengthOfThirdChoice,
    firstValidated,
    secondValidated,
    thirdValidated,
  ]);

  useEffect(() => {
    {/* set validationData with true or false */ }
    if (validation === true) {
      if (
        (choiceKey.length === lengthOfFirstChoice &&
          lengthOfFirstChoice !== selectedShapesMatch.length) ||
        selectedShapesNotMatch.length > 0
      ) {
        setFirstValidated(false); //firstValidated is the state of first choice validation
        validationData(false); //validationData is the function which is called when validation is changed
        setChoiceKey([]); //choiceKey is the array of shape and color of choice
      } else if (
        (choiceKey.length === lengthOfSecondChoice &&
          lengthOfSecondChoice !== selectedShapesMatch.length) ||
        selectedShapesNotMatch.length > 0
      ) {
        setSecondValidated(false); //secondValidated is the state of second choice validation
        validationData(false); //validationData is the function which is called when validation is changed
        setChoiceKey([]); //choiceKey is the array of shape and color of choice
      } else if (
        (choiceKey.length === lengthOfThirdChoice &&
          lengthOfThirdChoice !== selectedShapesMatch.length) ||
        selectedShapesNotMatch.length > 0
      ) {
        setThirdValidated(false); //thirdValidated is the state of third choice validation
        validationData("blocked"); //validationData is the function which is called when validation is changed
        setChoiceKey([]); //choiceKey is the array of shape and color of choice
        //current time + process.env.NEXT_PUBLIC_BLOCKTIME
        let blockedTo = new Date(); //blockedTo is the time after which user will be blocked
        blockedTo.setMinutes(
          blockedTo.getMinutes() + parseInt(process.env.NEXT_PUBLIC_BLOCKTIME) //process.env.NEXT_PUBLIC_BLOCKTIME is the time in minutes after which user will be blocked
        );
        localStorage.setItem("blockedTo", blockedTo); //blockedTo is the time after which user will be blocked
      } else {
        validationData(true);
      }

      setSelectedShapesArr([]); //set selectedShapesArr to empty array
      setSelectedShapesMatch([]); //set selectedShapesMatch to empty array
      setSelectedShapesNotMatch([]); //set selectedShapesNotMatch to empty array
      setChoiceKey([]); //set choiceKey to empty array
    }
  }, [choiceKey.length, lengthOfFirstChoice, lengthOfSecondChoice, lengthOfThirdChoice, secondValidated, selectedShapesMatch.length, selectedShapesNotMatch.length, validation, validationData]);

  return (
    <div className="grid grid-cols-5 w-full h-full">
      {Array(childSquareBoxNo)
        .fill()
        .map((_, index) =>
          dataArr.some((item) => item.key === index) ? (
            <button
              onClick={selectedShapes(
                dataArr.find((item) => item.key === index).key,
                dataArr.find((item) => item.key === index).shape,
                dataArr.find((item) => item.key === index).color
              )}
              key={index}
              disabled={
                dataArr.find(
                  (item) =>
                    item.key ===
                    selectedShapesArr.find((item) => item.key === index)?.key
                )
                  ? true
                  : false
              }
              className="flex items-center justify-center w-full h-full border border-borderColor bg-secondaryColor bg-opacity-40 disabled:bg-disabled disabled:bg-opacity-70 border-opacity-50 text-secondaryColor text-opacity-100 text-center"
            >
              {dataArr.some(
                (item) => item.key === index && item.shape === "triangle"
              ) ? (
                // Triangle draw using div
                <div
                  className={`w-0 h-0 hover:-translate hover:scale-125 border-solid border-l-12 border-r-12 text-secondaryColor text-opacity-0 border-b-20 transform rotate-${dataArr.find((item) => item.key === index).angle} ${
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
                  className={`w-1/2 h-1/2 hover:-translate hover:scale-125 rounded-full ${
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
                  className={`w-1/2 h-1/2 hover:-translate hover:scale-125 transform rotate-${dataArr.find((item) => item.key === index).angle} ${
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
              <span className="text-secondaryColor text-opacity-0 select-none">
                .
              </span>
            </div>
          )
        )}
    </div>
  );
}
