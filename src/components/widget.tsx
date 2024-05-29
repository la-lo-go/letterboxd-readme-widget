import React from "react";
import { Review } from "../rss";
import ReviewComponent from "./reviewComponent";

interface WidgetProps {
  reviews: Review[];
}

const Widget: React.FC<WidgetProps> = ({ reviews }) => {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <title>Last films seen</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="ml-6 mt-3 h-fit rounded-xl bg-[#14181C] text-[#657686] font-sans">
        <h1 className="text-xl leading-[1.2rem] font-semibold uppercase">Last films seen</h1>
        <div className="relative my-2 flex items-center">
          <div className="flex-grow border-t border-[#657686]"></div>
        </div>
        <div className="mr-3 flex flex-row gap-3">
          {reviews.map((review) => (
            <ReviewComponent
              key={review.link}
              score={review.score}
              coverLink={review.coverLink}
            />
          ))}
        </div>
      </body>
    </html>
  );
};

export default Widget;
