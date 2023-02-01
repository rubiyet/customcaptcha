import Webcam from "react-webcam";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Lottie from "lottie-react";
import loadingWebcamAnimation from "../public/loadingWebcamAnimation.json";

export default function WebCam() {
  const cameraWidth = 720; //camera width in pixels for the webcam
  const cameraHeight = 360; //camera height in pixels for the webcam
  const aspectRatio = cameraWidth / cameraHeight; //aspect ratio of the camera

  const videoConstraints = {
    width: {
      min: cameraWidth, //minimum width of the camera
    },
    height: {
      min: cameraHeight, //minimum height of the camera
    },
    aspectRatio, //aspect ratio of the camera
  };
  const webcamRef = useRef(); //reference to the webcam
  const webcamDiv = useRef(null); //reference to the webcam div
  const [width, setWidth] = useState(0); //state to store the width of the webcam div
  const [height, setHeight] = useState(0); //state to store the height of the webcam div

  useLayoutEffect(() => {
    if (webcamDiv.current) {
    setWidth(webcamDiv.current.offsetWidth); //set the width of the webcam div
    setHeight(webcamDiv.current.offsetHeight); //set the height of the webcam div
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(webcamDiv.current.offsetWidth); //set the width of the webcam div
      setHeight(webcamDiv.current.offsetHeight); //set the height of the webcam div
    };
    window.addEventListener("resize", handleResize); //add event listener to the window

    return () => {
      window.removeEventListener("resize", handleResize); //remove event listener from the window
    };
  }, []);

  const [image, setImage] = useState(); //state to store the image

  const [style, setStyle] = useState({}); //state to store the style of the webcam
  const [lockedStyle, setLockedStyle] = useState({}); //state to store the style of the webcam
  const [randomTop, setRandomTop] = useState(0); //state to store the random top value
  const [randomLeft, setRandomLeft] = useState(0); //state to store the random left value
  const [captured, setCaptured] = useState(false); //state to store the captured value
  const [location, setLocation] = useState(); //state to store the location of the webcam
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!captured){
        setRandomTop(Math.floor(Math.random() * 40));
        setRandomLeft(Math.floor(Math.random() * 65));
        setLocation({top: randomTop, left: randomLeft})
      }
      setStyle({
        position: "absolute",
        top: `${randomTop}%`,
        left: `${randomLeft}%`,
        transition: "all 1s ease-linear",
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [randomTop, randomLeft, captured, location]);

  {
    /* handleCaptureScreenshot function to capture the screenshot of the webcam */
  }
  function handleCaptureScreenshot() {
    setCaptured(true);
    setLockedStyle({
      position: "absolute",
      top: `${location.top}%`,
      left: `${location.left}%`
    });
    const imageSrc = webcamRef.current.getScreenshot(); //get the screenshot of the webcam
    setImage(imageSrc); //set the image state
    console.log(webcamRef.current.video.videoWidth); //width of the video
    console.log(randomTop, randomLeft);
  }

  const reset = () => {
    setCaptured(false);
    setImage(undefined);
  };

  const [loadingWebcam, setLoadingWebcam] = useState(false)
  
  useEffect(() => {
    setInterval(() => {
      setLoadingWebcam(true)
    }, 3000);
  }, [])

  const handleUserMedia = () => {
    console.log(webcamRef.current.stream)
  }


  return (
    <>
      {/* if image is not undefined then show the image */}
      {image && (
        <div className="flex justify-center">
          <div className="space-y-3">
            {/* Title*/}
            <div className="flex justify-center py-2 px-10 text-3xl font-semibold text-primaryColor">
              Select ...
            </div>
            <div className="relative">
              <div
                style={lockedStyle}
                className="w-24 h-24 md:w-52 md:h-52 border-2 border-borderColor"
              ></div>
              {/* image preview */}
              <Image
                src={image} //image source
                alt={"image"} //image alt
                width={cameraWidth} //image width
                height={cameraHeight} //image height
              />
            </div>
            <div className="flex justify-center space-x-5">
              {/* buttons to validate the image */}
              <button
                onClick={reset}
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
            <div className="flex justify-center py-2 px-10 text-3xl font-semibold text-primaryColor">
              Take Selfie ({width} x {height})
            </div>
            <div className={`flex justify-center relative ${loadingWebcam ? "hidden" : "block"}`}><Lottie animationData={loadingWebcamAnimation} loop={true} className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80" /></div>
            {/* webcam */}
            <div ref={webcamDiv} className={` relative ${loadingWebcam ? "block" : "hidden"}`}>
              <div
                style={style}
                className="w-24 h-24 md:w-52 md:h-52 border-2 border-borderColor"
              ></div>
              <Webcam
                ref={webcamRef} //reference to the webcam
                videoConstraints={videoConstraints} //video constraints
                width={cameraWidth} //camera width
                height={cameraHeight} //camera height
              />
            </div>
            <div className="flex justify-center">
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
