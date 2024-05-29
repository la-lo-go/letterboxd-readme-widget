import React from "react";

interface ReviewProps {
  key: string;
  score: string;
  coverLink: string;
}

interface ImageProps {
  imageUrl: string;
}

export const ReviewComponent: React.FC<ReviewProps> = ({
  key,
  score,
  coverLink,
}) => (
  <div>
    <ImageComponent imageUrl={coverLink} />
    <h2>{score}</h2>
  </div>
);

export default ReviewComponent;

const ImageComponent: React.FC<ImageProps> = ({ imageUrl }: ImageProps) => {
  return <img className="min-w-32 rounded" src={imageUrl} alt="Image" />;
};

export async function fetchImage(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
}
