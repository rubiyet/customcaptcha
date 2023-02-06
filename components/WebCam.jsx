import Webcam from "react-webcam";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import loadingWebcamAnimation from "../public/loadingWebcamAnimation.json";
import lockedAnimation from "../public/lockedAnimation.json";
import validatedAnimation from "../public/validatedAnimation.json";
import SquareSector from "./SquareSector";
import style from "../styles/WebCam.module.css";

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
    }, 500); //set the interval to 2 seconds

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
  const [validated, setValidated] = useState(false); //state to store the validated value
  const [notValidated, setNotValidated] = useState(false); //state to store the notValidated value
  const [blocked, setBlocked] = useState(false); //state to store the blocked value

  const validate = () => {
    setValidation(true); //set the validated state to true
    setValidated(false); //set the validated state to false
  };

  const validationData = (data) => {
    setValidation(false); //set the validation state to false
    data === true ? setValidated(true) : setNotValidated(true); //set the notValidated state
    data === "blocked" && setBlocked(true); //set the blocked state
  }

    //reset function to reset the image
    const reset = () => {
      setBlocked(false); //set the blocked state to false
      setCaptured(false); //set the captured state to false
      setImage(undefined); //set the image state to undefined
      setLoadingWebcam(false); //set the loadingWebcam state to false
      setValidation(false); //set the validation state to false
      setValidated(false); //set the validated state to undefined
      setNotValidated(false); //set the notValidated state to undefined
    };

    useEffect(() => {
      //if current time ===  or grater than localStorage blockTo time, then set the blocked state to false
      //if localStorage.getItem("blockTo") is exist, then set the blocked state to true
      const currentTime = new Date().getTime();
      console.log(currentTime);
      if (localStorage.getItem("blockedTo") !== null) {
          console.log("l", new Date(localStorage.getItem("blockedTo")).getTime());
          //localStorage.getItem("blockedTo") to getTime() to get the time in milliseconds
          if (currentTime >= new Date(localStorage.getItem("blockedTo")).getTime()) {
            setBlocked(false);
          } else {
            setBlocked(true);
          }
      }
      console.log((new Date(localStorage.getItem("blockedTo")).getTime() - currentTime) / 1000);
    }, []);

  const numberToWords = (number) => {
    //function to convert number to words
    const words = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight" ]

    return words[number - 1];
  };

    
  return (
    <>
      {/* if image is not undefined then show the image */}
      {image && (
        <div className="flex justify-center">
          <div>
            {/* Title*/}
              {notValidated && !validated && !blocked && <div className="flex items-center justify-center text-blockedColor font-semibold text-xl h-10">You selected some wrong shapes.</div>}
            <div className="flex items-center justify-center py-2 px-10 text-sm h-10 font-semibold text-primaryColor space-x-5">
              {validated === false && blocked === false &&
                  <div className="flex items-center justify-center space-x-1 text-md h-10">
            <span >Please Select </span>
            <div className="flex items-center space-x-1">
              {choiceStore?.map((choice, index) => (
                <div key={index}>{index === choiceStore.length - 1 ? <span>and {numberToWords(choice.count)} {choice.shape.split('-')[1]} {choice.count > 1 ? choice.shape.split('-')[0] + 's' : choice.shape.split('-')[0]}</span> : <span>{numberToWords(choice.count)} {choice.shape.split('-')[1]} {choice.count > 1 ? choice.shape.split('-')[0] + 's' : choice.shape.split('-')[0]},</span>}</div>
              ))}
            </div>
            </div>
              }
            </div>
            <div className="flex justify-center">
            {!blocked && validated && <div><Lottie
                animationData={validatedAnimation}
                loop={false}
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96"
              /> <div className="flex items-center justify-center text-validatedColor font-semibold text-xl h-10">Welcome, You are Validated.</div>
              <div className={`${style.confetti} w-full`}>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
    <div class={`${style.confettiPiece}`}></div>
</div>
</div> }
            {blocked && !validated && <div><div className="flex items-center justify-center"><Lottie
                animationData={lockedAnimation}
                loop={false}
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96"
              /></div><div className="flex items-center justify-center text-blockedColor text-opacity-80 font-semibold text-xl h-10">We declare you as a robot. Come back after 2 minutes when your humanity is restored.</div></div> } </div>
              {!blocked && !validated && <div className="space-y-3"><div className="flex justify-center">
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
              /></div></div>
                          <div className="flex justify-center">
              {/* buttons to validate the image */}
              {blocked && validated &&
              <button
                onClick={validate}
                className="text-lg font-semibold text-secondaryColor uppercase bg-tertiaryColor hover:bg-quaternaryColor rounded-full py-2 px-10"
              >
                Validate
              </button> } 
              {/* buttons to reset the image */}
              {!blocked && !validated && <div className="space-x-5">
                <button
                onClick={validate}
                className="text-lg font-semibold text-secondaryColor uppercase bg-tertiaryColor hover:bg-quaternaryColor rounded-full py-2 px-10"
              >
                Validate
              </button>
              <button
                onClick={reset}
                className="text-lg font-semibold text-secondaryColor uppercase bg-quinaryColor hover:bg-senaryColor rounded-full py-2 px-10"
              >
                Reset
              </button> </div>}
            </div>
            </div> }
          </div>
        </div>
      )}
      {/* if image is undefined then show the webcam */}
      {!image && (
        <div className="flex justify-center">
                                {blocked && <div><div className="flex items-center justify-center text-blockedColor font-semibold text-lg h-8">We declare you as a robot. Come back after 2 minutes when your humanity is restored.</div>
                                <div className="flex justify-center"><Lottie
                animationData={lockedAnimation}
                loop={false}
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96"
              /></div></div> } 
              {!blocked &&
        <div className="">
                      {/* Title*/}
                      <div className="flex items-center justify-center text-primaryColor font-semibold text-xl h-10">
              Show your face to prove that you are not a robot 😜
            </div>
          <div className="space-y-2">
            {loadingWebcam ? ( <div className="space-y-3">
            <div className={`relative`}>
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
            </div></div> ) : (
                          <div
                          className={`flex justify-center relative`}
                        >
                          <Lottie
                            animationData={loadingWebcamAnimation}
                            loop={true}
                            className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80"
                          />
                          {/* loading animation */}
                        </div> )}
          </div>
        </div> }
        </div>
      )}
    </>
  );
}
