import Webcam from "react-webcam";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import loadingWebcamAnimation from "../public/loadingWebcamAnimation.json";
import SquareSector from "./SquareSector";

export default function WebCam() {
  const [webcamWidth, setWebcamWidth] = useState(720); //state to store the camera width
  const [webcamHeight, setWebcamHeight] = useState(360); //state to store the camera height
  const [webcamAspectRatio, setWebcamAspectRatio] = useState(
    webcamWidth / webcamHeight
  ); //state to store the aspect ratio of the camera

  const webcamVideoConstraints = {
    width: {
      min: webcamWidth, //minimum width of the camera
    },
    height: {
      min: webcamHeight, //minimum height of the camera
    },
    aspectRatio: webcamAspectRatio, //aspect ratio of the camera
  };

  const webcamRef = useRef(); //reference to the webcam
  const [image, setImage] = useState(); //state to store the image
  const [unlockSquareStyle, setUnlockSquareStyle] = useState({}); //state to store the style of the unlockSquare
  const [lockedSquareStyle, setLockedSquareStyle] = useState({}); //state to store the style of the lockedSquare
  const [unlockSquareRandomTop, setUnlockSquareRandomTop] = useState(0); //state to store the random top value
  const [unlockSquareRandomLeft, setUnlockSquareRandomLeft] = useState(0); //state to store the random left value
  const [captured, setCaptured] = useState(false); //state to store the captured value
  const [lockedSquareLocation, setLockedSquareLocation] = useState(); //state to store the location of the webcam
  const [loadingWebcam, setLoadingWebcam] = useState(false); //state to store the loadingWebcam value

  useEffect(() => {
    //useEffect to set the style of the unlockSquare
    const squareInterval = setInterval(() => {
      if (!captured) {
        setUnlockSquareRandomTop(Math.floor(Math.random() * 40)); //generate a random top value for the unlockSquare
        setUnlockSquareRandomLeft(Math.floor(Math.random() * 65)); //generate a random left value for the unlockSquare
        setLockedSquareLocation({
          top: unlockSquareRandomTop,
          left: unlockSquareRandomLeft,
        }); //set the location of the lockedSquare
      }
      setUnlockSquareStyle({
        position: "absolute", //position of the unlockSquare
        top: `${unlockSquareRandomTop}%`, //top value of the unlockSquare
        left: `${unlockSquareRandomLeft}%`, //left value of the unlockSquare
        transition: "all 1s ease-linear", //transition of the unlockSquare
      });
    }, 3000); //set the interval to 3 seconds

    return () => clearInterval(squareInterval); //clear the interval
  }, [captured, unlockSquareRandomTop, unlockSquareRandomLeft]); //dependencies

  {
    /* handleCaptureScreenshot function to capture the screenshot of the webcam */
  }
  function handleCaptureScreenshot() {
    setCaptured(false); //set the captured state to false
    setCaptured(true); //set the captured state to true
    setLockedSquareStyle({
      //set the style of the lockedSquare
      position: "absolute", //position of the lockedSquare
      top: `${lockedSquareLocation.top}%`, //top value of the lockedSquare
      left: `${lockedSquareLocation.left}%`, //left value of the lockedSquare
    });
    const imageSrc = webcamRef.current.getScreenshot(); //get the screenshot of the webcam
    setImage(imageSrc); //set the image state
  }

  //useEffect to set the loadingWebcam state to true after 5 seconds
  useEffect(() => {
    setInterval(() => {
      setLoadingWebcam(true); //set the loadingWebcam state to true
    }, 5000);
  }, []);

  const [choiceStore, setChoiceStore] = useState(); //state to store the choices
  
  const pull_data = (data) => {
    // console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    setChoiceStore(data); //set the choiceStore state
  }

  const [validation, setValidation] = useState(false); //state to store the validation value
  const [validated, setValidated] = useState(); //state to store the validated value

  const validate = () => {
    setValidation(true); //set the validated state to true
  };

  const validationData = (data) => {
    setValidated(data); //set the validation state
    console.log(validated); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  }

    //reset function to reset the image
    const reset = () => {
      setCaptured(false); //set the captured state to false
      setImage(undefined); //set the image state to undefined
      setLoadingWebcam(false); //set the loadingWebcam state to false
      setValidation(false); //set the validation state to false
      setValidated(''); //set the validated state to undefined
    };

  return (
    <>
      {/* if image is not undefined then show the image */}
      {image && (
        <div className="flex justify-center">
          <div className="space-y-3">
            {/* Title*/}
            <div className="flex justify-center py-2 px-10 text-sm h-8 font-semibold text-primaryColor space-x-5">
              {validated === true ? "Validated" : null}
              {validated === false ? "Not Validated" : null}
              {!validation &&
                <div className="flex items-center space-x-5">
            <span >Select :</span>
              {choiceStore?.map((choice, index) => {
                <div key={index}>{choice.shape}: {choice.count}</div>
                if (choice.shape.split('-')[0] === 'triangle') {
                  return <div key={index} className="flex items-center space-x-2">
                   <span className="text-lg">{choice.count}</span>
                  <div
                  className={`text-secondaryColor text-opacity-0 w-0 h-0 border-solid  border-l-12 border-r-12 border-b-20 border-opacity-60 ${
                    choice.shape.split('-')[1] === "red"
                      ? " border-b-red"
                      : choice.shape.split('-')[1] ===
                        "green"
                      ? " border-b-green"
                      : " border-b-blue"
                  }`}
                ></div> 
                </div>
                } else if (choice.shape.split('-')[0] === 'circle') {
                  return <div key={index} className="flex items-center space-x-2">
                    <span className="text-lg">{choice.count}</span>
                <div
                  className={`w-5 h-5 rounded-full bg-opacity-60 ${
                    choice.shape.split('-')[1] === "red"
                      ? " bg-red"
                      : choice.shape.split('-')[1] ===
                        "green"
                      ? " bg-green"
                      : " bg-blue"
                  }`}
                ></div>
                </div>
                } else if (choice.shape.split('-')[0] === 'square') {
                  return <div key={index} className="flex items-center space-x-2">
                    <span className="text-lg">{choice.count}</span>
                    <div
                  className={`w-5 h-5 bg-opacity-60 ${
                    choice.shape.split('-')[1] === "red"
                      ? " bg-red"
                      : choice.shape.split('-')[1] ===
                        "green"
                      ? " bg-green"
                      : " bg-blue"
                  }`}
                ></div>
                </div>
                }
              })}
              </div>
              }
            </div>
            <div className="relative">
              <div
                style={lockedSquareStyle}
                className="w-24 h-24 md:w-52 md:h-52 border border-borderColor border-opacity-40"
              >
                <SquareSector captured={captured} func={pull_data} validation={validation} validationData={validationData} /> {/* component to show the square sector */}
              </div>
              {/* image preview */}
              <Image
                src={image} //image source
                alt={"image"} //image alt
                width={webcamWidth} //image width
                height={webcamHeight} //image height
              />
            </div>
            <div className="flex justify-center space-x-5">
              {/* buttons to validate the image */}
              <button
                onClick={validate}
                className="text-lg font-semibold text-secondaryColor uppercase bg-tertiaryColor hover:bg-quaternaryColor rounded-full py-2 px-10"
              >
                Validate
              </button>
              {/* buttons to reset the image */}
              <button
                onClick={reset}
                className="text-lg font-semibold text-secondaryColor uppercase bg-quinaryColor hover:bg-senaryColor rounded-full py-2 px-10"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      {/* if image is undefined then show the webcam */}
      {!image && (
        <div className="flex justify-center">
          <div className="space-y-3">
            {/* Title*/}
            <div className="flex justify-center py-2 px-10 text-sm h-8 font-semibold text-primaryColor">
              Take Selfie
            </div>
            <div
              className={`flex justify-center relative ${
                loadingWebcam ? "hidden" : "block"
              }`}
            >
              <Lottie
                animationData={loadingWebcamAnimation}
                loop={true}
                className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80"
              />
              {/* loading animation */}
            </div>
            {/* webcam */}
            <div className={` relative ${loadingWebcam ? "block" : "hidden"}`}>
              <div
                style={unlockSquareStyle}
                className="w-24 h-24 md:w-52 md:h-52 border-2 border-borderColor border-opacity-40"
              ></div>
              <Webcam
                ref={webcamRef} //reference to the webcam
                videoConstraints={webcamVideoConstraints} //video constraints
                width={webcamWidth} //camera width
                height={webcamHeight} //camera height
              />
            </div>
            <div
              className={`flex justify-center ${
                loadingWebcam ? "block" : "hidden"
              }`}
            >
              {/* button to capture the screenshot */}
              <button
                onClick={handleCaptureScreenshot}
                className="text-lg font-semibold text-secondaryColor uppercase bg-tertiaryColor hover:bg-quaternaryColor rounded-full py-2 px-10"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
