export const secureRandomNumber = (min, max) => {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1); 
    return Math.floor(randomNumber * (max - min + 1) + min);
  };


export const zeroPad = (num) =>{
    return num.toString().padStart(5, "0");
}