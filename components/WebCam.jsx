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
    <div>{image && <Image src={image} alt={"image"} width={cameraWidth} height={cameraHeight} />}
      {!image && (
        <Webcam
          ref={webcamRef}
          videoConstraints={videoConstraints}
          width={cameraWidth}
          height={cameraHeight}
        />
      )}
      <button onClick={handleCaptureScreenshot}>Capture photo</button>
    </div>
  );
}
