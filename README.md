# CustomCaptcha

<p style='text-align: justify;'>CAPTCHA, an acronym for Completely Automated Public Turing test to tell Computers and Humans Apart, is a commonly used security mechanism that aims to prevent automated systems from accessing protected resources. The goal of this project is to develop a new, user-friendly and interactive form of CAPTCHA that involves capturing a photo of the user.

The CAPTCHA mechanism will prompt the user to capture a selfie using the front-facing camera or webcam. The photo will be processed locally on the client-side and will not be stored. A white square area will move randomly within the viewfinder window and once the picture has been taken, the white box will lock onto the still image. The user will then be asked to identify various shapes and colors displayed within the white box on a 5x5 grid. To pass the CAPTCHA, the user must correctly choose all of the shapes.

This approach provides a more engaging and interactive experience for users compared to traditional text-based or image-based CAPTCHAs.
</p>
## Live Demo

Live demo for this project is hosted [here](https://customcaptcha.vercel.app/).

## Development Framework

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

After cloning the repo, first install [NEXT.JS](https://nextjs.org/docs/getting-started).

```bash
cp path/to/repo
npm install next react react-dom
```

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Validation Flow

The validation flow for the CAPTCHA mechanism will consist of the following key steps:

<p align="center">
  <img src="doc/assets/cameraWindow.png" width="" height="280" />
</p>
<p align="justify">
1. User Capture: The user will be prompted to capture a photo of themselves using the front-facing camera or webcam.
   
<p align="center">
  <img src="doc/assets/shapeIdentificationWindow.png" width="" height="280" />
</p>

2. Shape Identification: Once the photo has been taken, the user will be asked to identify various shapes and colors displayed within the white box on a 5x5 grid.

<p align="center">
  <img src="doc/assets/validationAttemptsWindow.png" width="" height="280" />
</p>

3. Validation Attempts: The user will be given three chances to correctly identify the shapes and pass the CAPTCHA.

<p align="center">
  <img class=mobile-image src="doc/assets/validatedResultWindow.png" />
  <img class=mobile-image src="doc/assets/resultWindow.png" />
</p>

<style>
  .img {
    display: inline-block;
  }
  img.mobile-image {
    width: 37%;
    display: inline-block;
  }
</style>

<p align="justify">
4. Result: If the user successfully identifies the shapes within the three attempts, they will be granted access to the protected resource. If the user fails to correctly identify the shapes within the three attempts, they will be blocked for a certain time defined in the .env file.
</p>
<p align="justify">
  It is important to note that this validation flow is designed to prevent automated systems from accessing protected resources while providing a user-friendly and interactive experience. The length of the block time can be adjusted based on the specific needs of the implementation.
</p>

## .env configurations

```bash
NEXT_PUBLIC_BLOCKTIME = 2 
NEXT_PUBLIC_SQUAREBOXSETINTERVAL = 500 
NEXT_PUBLIC_LENGTHOFFIRSTCHOICE = 4 
NEXT_PUBLIC_LENGTHOFSECONDCHOICE = 6 
NEXT_PUBLIC_LENGTHOFTHIRDCHOICE = 8 
```
<p align="justify">
  The NEXT_PUBLIC_BLOCKTIME value in the .env file determines the length of time that a user will be blocked if they fail to correctly identify the shapes within the three validation attempts. With a value of 2, this means that a user who fails the CAPTCHA will be blocked for 2 minutes. This value can be adjusted based on the specific requirements of the implementation.
</p>

<p align="justify">
  The NEXT_PUBLIC_SQUAREBOXSETINTERVAL value in the .env file determines the frequency at which the square-shaped area inside the video stream will change its position. With a value of 500, this means that the square-shaped area will change its position every 500 milliseconds (or 0.5 seconds). This value can be adjusted to determine the speed at which the area moves, and can be used to fine-tune the user experience and make the CAPTCHA more or less challenging.
</p>

<p align="justify">
  The NEXT_PUBLIC_LENGTHOFFIRSTCHOICE, NEXT_PUBLIC_LENGTHOFSECONDCHOICE, and NEXT_PUBLIC_LENGTHOFTHIRDCHOICE values in the .env file determine the number of shapes that the user will need to identify in each of the three validation attempts. With a value of 4 for NEXT_PUBLIC_LENGTHOFFIRSTCHOICE, the user will need to correctly identify 4 shapes in their first attempt at the CAPTCHA. If they fail, they will then be given a second attempt with 6 shapes to identify (as determined by NEXT_PUBLIC_LENGTHOFSECONDCHOICE with a value of 6). If they fail again, they will have one final attempt with 8 shapes to identify (as determined by NEXT_PUBLIC_LENGTHOFTHIRDCHOICE with a value of 8). These values can be adjusted to make the CAPTCHA more or less challenging, depending on the specific requirements of the implementation. By increasing the number of shapes to identify in each attempt, the CAPTCHA becomes more difficult and less susceptible to being bypassed by automated systems. Conversely, by decreasing the number of shapes, the CAPTCHA becomes easier and more user-friendly.
</p>

## Limitations
1. No automated test (no time)

## Future Scope 
1. Live face detection 
2. 
