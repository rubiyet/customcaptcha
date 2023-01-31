import Webcam from "react-webcam";
import { useRef, useState } from "react";
import Image from "next/image";

export default function WebCam() {
  const cameraWidth = 720;
  const cameraHeight = 720;
  const aspectRatio = cameraWidth / cameraHeight;

  const videoConstraints = {
    width: {
      min: cameraWidth,
    },
    height: {
      min: cameraHeight,
    },
    aspectRatio,
  };
  const webcamRef = useRef();

  const [image, setImage] = useState();

  function handleCaptureScreenshot() {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }
  return (
    <>
      {image && (
        <div className="flex justify-center">
          <div className="space-y-3">
            <div className="flex justify-center py-2 px-10 text-3xl font-semibold text-primaryColor">
              Select ...
            </div>
            <Image
              src={image}
              alt={"image"}
              width={cameraWidth}
              height={cameraHeight}
            />
            <div className="flex justify-center space-x-5">
              <button
                onClick={() => setImage(undefined)}
                className="text-lg font-semibold text-secondaryColor uppercase bg-tertiaryColor hover:bg-quaternaryColor rounded-full py-2 px-10"
              >
                Validate
              </button>
              <button
                onClick={() => setImage(undefined)}
                className="text-lg font-semibold text-secondaryColor uppercase bg-quinaryColor hover:bg-senaryColor rounded-full py-2 px-10"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      {!image && (
        <div className="flex justify-center">
          <div className="space-y-3">
            <div className="flex justify-center py-2 px-10 text-3xl font-semibold text-primaryColor">
              Take Selfie
            </div>
            <Webcam
              ref={webcamRef}
              videoConstraints={videoConstraints}
              width={cameraWidth}
              height={cameraHeight}
            />
            <div className="flex justify-center">
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
