import Webcam from "react-webcam"; //import the react-webcam package
import { useEffect, useRef, useState } from "react"; //import the react hooks
import Image from "next/image"; //import the next/image package
import Lottie from "lottie-react"; //import the lottie-react package
import loadingWebcamAnimation from "../public/loadingWebcamAnimation.json"; //import the loadingWebcamAnimation
import lockedAnimation from "../public/lockedAnimation.json"; //import the lockedAnimation
import validatedAnimation from "../public/validatedAnimation.json"; //import the validatedAnimation
import SquareSector from "./SquareSector"; //import the SquareSector component
import style from "../styles/WebCam.module.css"; //import the WebCam.module.css file
import undoRed from "../public/undoRed.png"; //import the undoRed image

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
    facingMode: "user"
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
    }, process.env.NEXT_PUBLIC_SQUAREBOXSETINTERVAL ); //set the interval to 2 seconds

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
    setChoiceStore(data); //set the choiceStore state
  };

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
  };

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

  {/* useEffect to check if the user is blocked or not */}
  useEffect(() => {
    const currentTime = new Date().getTime(); //get the current time
    if (localStorage.getItem("blockedTo") !== null) {
      if (
        currentTime >= new Date(localStorage.getItem("blockedTo")).getTime() //check if the current time is greater than the blockedTo time
      ) {
        setBlocked(false); //set the blocked state to false
      } else {
        setBlocked(true); //set the blocked state to true
      }
    }
  }, []);

  {/* function for converting number to words */}
  const numberToWords = (number) => {
    const words = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
    ];

    return words[number - 1];
  };

  {/* useEffect to disable the right click */}
  useEffect(() => {
    const handleContextmenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  const [delayText, setDelayText] = useState(false); //state to store the delayText value

  {/* useEffect to set the delayText state to true after 12 seconds */}
  useEffect(() => {
    setInterval(() => {
      setDelayText(true);
    }, 12000);
  }, []);

  return (
    <>
      {/* if image is not undefined then show the image */}
      {image && (
        <div className="flex justify-center">
          <div>
            {/* Title*/}
            <div className="flex justify-center">
              {!blocked && validated && (
                <div>
                  <Lottie
                    animationData={validatedAnimation}
                    loop={false}
                    className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96"
                  />{" "}
                  <div className="flex items-center justify-center text-secondaryColor bg-validatedColor font-semibold text-xl h-14 select-none rounded-md">
                    Welcome, You are Validated.
                  </div>
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
                </div>
              )}
              {blocked && !validated && (
                <div>
                  <div className="flex items-center justify-center">
                    <Lottie
                      animationData={lockedAnimation}
                      loop={false}
                      className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96"
                    />
                  </div>
                  {delayText && (
                    <div
                      className={`select-none flex items-center justify-center bg-blockedColor text-borderColor text-opacity-80 font-semibold text-xl h-14 px-5 rounded-md ${style.lineUp}`}
                    >
                      We declare you as a robot. Come back after{" "}
                      {process.env.NEXT_PUBLIC_BLOCKTIME} minutes when your humanity is
                      restored.
                    </div>
                  )}
                </div>
              )}{" "}
            </div>
            {!blocked && !validated && (
              <div className="space-y-3 pt-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div
                      style={lockedSquareStyle}
                      className="w-24 h-24 md:w-52 md:h-52 border border-borderColor border-opacity-40"
                    >
                      <SquareSector
                        captured={captured}
                        func={pull_data}
                        validation={validation}
                        validationData={validationData}
                      />{" "}
                      {/* component to show the square sector */}
                    </div>
                    {/* image preview */}
                    <Image
                      src={image} //image source
                      alt={"image"} //image alt
                      width={webcamWidth} //image width
                      height={webcamHeight} //image height
                    />
                  </div>
                </div>
                {notValidated && !validated && !blocked && (
              <div className="flex items-center justify-center text-secondaryColor font-semibold text-xl h-14 select-none bg-blockedColor rounded-md">
                Could not validate. Try again.
              </div>
            )}
                <div className="flex items-center justify-center py-2 px-10 text-sm font-semibold text-primaryColor space-x-5 border-2 border-primaryColor rounded-md">
                  {validated === false && blocked === false && (
                    <div className="text-xl select-none">
                      <p>Please Select -</p>
                      <ul className="list-disc pl-6">
                        {choiceStore?.map((choice, index) => (
                          <li key={index}>
                            {index === choiceStore.length - 1 ? (
                              <span>
                                {numberToWords(choice.count)}{" "}
                                {choice.shape.split("-")[1]}{" "}
                                {choice.count > 1
                                  ? choice.shape.split("-")[0] + "s"
                                  : choice.shape.split("-")[0]}
                              </span>
                            ) : (
                              <span>
                                {numberToWords(choice.count)}{" "}
                                {choice.shape.split("-")[1]}{" "}
                                {choice.count > 1
                                  ? choice.shape.split("-")[0] + "s"
                                  : choice.shape.split("-")[0]}
                                ,
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {/* buttons to validate the image */}
                  {blocked && validated && (
                    <button
                      onClick={validate}
                      className="text-lg font-semibold text-secondaryColor uppercase border-2 border-primaryColor rounded-full py-2 px-8"
                    >
                      <Image
                        src="./camera.svg"
                        alt="camera"
                        width={40}
                        height={0}
                        className="hover:-translate-y-1 hover:scale-110"
                      />
                    </button>
                  )}
                  {/* buttons to reset the image */}
                  {!blocked && !validated && (
                    <div className="space-x-5">
                      <button
                        onClick={validate}
                        className="text-lg font-semibold text-secondaryColor uppercase border-2 border-primaryColor rounded-full py-2 px-8"
                      >
                        <Image
                          src="./validate.svg"
                          alt="camera"
                          width={40}
                          height={0}
                          className="hover:-translate-y-1 hover:scale-110"
                        />
                      </button>
                      <button
                        onClick={reset}
                        className="text-lg font-semibold text-secondaryColor uppercase border-2 border-primaryColor rounded-full py-2 px-8"
                      >
                        <Image
                          src={undoRed}
                          alt="camera"
                          width={40}
                          height={0}
                          className="hover:-translate-y-1 hover:scale-110"
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* if image is undefined then show the webcam */}
      {!image && (
        <div className="flex justify-center">
          {blocked && (
            <div>
              <div className="flex items-center justify-center">
                <Lottie
                  animationData={lockedAnimation}
                  loop={false}
                  className="w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96"
                />
              </div>
              <div
                className={`select-none flex items-center justify-center bg-blockedColor text-borderColor text-opacity-80 font-semibold text-xl h-14 px-5 rounded-md ${style.lineUp}`}
              >
                We declare you as a robot. Come back after{" "}
                {process.env.NEXT_PUBLIC_BLOCKTIME} minutes when your humanity is
                restored.
              </div>
            </div>
          )}
          {!blocked && (
            <div className="pt-6">
              {/* Title*/}
              {/* <div className="flex items-center justify-center text-primaryColor font-semibold text-xl h-10">
              Show your face to prove that you are not a robot 😜
            </div> */}
              <div className="space-y-2">
                {loadingWebcam ? (
                  <div className="space-y-6">
                    <div className={`relative`}>
                      <div
                        style={unlockSquareStyle}
                        className="w-24 h-24 md:w-52 md:h-52 border-2 border-borderColor border-opacity-40 select-none"
                      ></div>
                      <Webcam
                        ref={webcamRef} //reference to the webcam
                        videoConstraints={webcamVideoConstraints} //video constraints
                        width={webcamWidth} //camera width
                        height={webcamHeight} //camera height
                        className="rounded-md"
                      />
                    </div>
                    <div
                      className={`flex items-center justify-center w-[45rem] border-2 bg-opacity-80 rounded-md font-semibold text-xl h-14 text-primaryColor select-none ${
                        loadingWebcam ? "block" : "hidden"
                      }`}
                    >
                      Capture a selfie to continue. Do not worry about the
                      jumping box.
                    </div>
                    <div
                      className={`flex justify-center ${
                        loadingWebcam ? "block" : "hidden"
                      }`}
                    >
                      {/* button to capture the screenshot */}
                      <button
                        onClick={handleCaptureScreenshot}
                        className="text-lg font-semibold text-secondaryColor uppercase border-2 border-primaryColor rounded-full py-2 px-8"
                      >
                        <Image
                          src="./camera.svg"
                          alt="camera"
                          width={40}
                          height={0}
                          className="hover:-translate-y-1 hover:scale-110"
                        />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`relative`}>
                    <div className="flex justify-center">
                      {" "}
                      <Lottie
                        animationData={loadingWebcamAnimation}
                        loop={true}
                        className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80"
                      />
                    </div>
                    <div
                      className={`flex items-center justify-center w-[45rem] bg-primaryColor bg-opacity-80 rounded-md font-semibold text-xl h-14 text-borderColor select-none ${
                        loadingWebcam ? "hidden" : "block"
                      }`}
                    >
                      Please wait. Initializing camera...
                    </div>
                    {/* loading animation */}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
