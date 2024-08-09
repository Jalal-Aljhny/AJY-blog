async function useDownloadImage(imageSrc) {
  const image = await fetch(imageSrc);
  const imageBlob = await image.blob();
  const imageURL = URL.createObjectURL(imageBlob);
  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "image.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default useDownloadImage;
