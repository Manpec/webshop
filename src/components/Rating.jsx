import React, { useEffect, useState } from "react";
import { StarFill } from "react-bootstrap-icons";

export default function Rating(props) {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const [ratingAverage, setRatingAvarage] = useState(0);

  /**
   * This useEffect hookuseEffect hook calculates the average of these values.
   * The useEffect hook runs every time the number of ratings in the array ("props.item.rating?.length") changes.
   */
  useEffect(() => {
    let average = 0;
    for (let i = 0; i < props.item.rating?.length; i++) {
      average += props.item.rating[i]; //ex) [1,5,3] 1+5+3 = 9
    }
    average = average / props.item.rating?.length;
    setRatingAvarage(average);
  }, [rating, props.item.rating?.length]);

  const rateClick = (ratingValue) => {
    //If disableRating is "FALSE" run addRating-function and setRating-function
    if (!props?.disableRating) {
      props.addRating(props.item.productnumber, ratingValue);
      setRating(ratingValue);
    }
    setRating(0); //Reset ratingValue
  };

  return (
    <>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              style={{ display: "none" }}
              value={ratingValue}
              disabled={props.item?.disabledRating}
              onClick={() => rateClick(ratingValue)}
            />
            <StarFill
              size={20}
              cursor={"pointer"}
              transition={"color 500ms"}
              color={
                ratingAverage >= ratingValue || hover >= ratingValue
                  ? "#FFC107"
                  : "#E4E5E9"
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}

      <span style={{ color: "black" }}>({props.item?.rating?.length})</span>
    </>
  );
}
