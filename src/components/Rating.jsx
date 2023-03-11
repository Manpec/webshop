import React, { useEffect, useState } from "react";
import { StarFill } from "react-bootstrap-icons";

export default function Rating(props) {
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);
     const [ratingMedian, setRatingMedian] = useState(0)
 
     useEffect(() => {
             let median = 0;
             for (let i = 0; i < props.item.rating?.length; i++) {
                 median +=  props.item.rating[i];
             }
             median = median / props.item.rating?.length
             setRatingMedian(median)
     }, [rating])
     
 
    const rateClick = (ratingValue)=>{
 
     if(!props?.disableRating){
         props.addRating(props.item.productnumber, ratingValue)
         setRating(ratingValue)
     }
     return
    }
 

  return (
    <>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1; //Every star has this value 1 = ☆
     return (
                <label key={i}>
            <input
              type="radio"
              name="rating"
              style={{display:'none'}}
              value={ratingValue}
              disabled={props.disableRating}
              onClick={()=>rateClick(ratingValue)}
                
            
            />
            <StarFill
              size={20}
              cursor={'pointer'}
              transition={'color 500ms'}
              color={ratingMedian >= ratingValue || hover >= ratingValue ? "#FFC107" : "#E4E5E9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
        
       
      })}

      <span style={{color:'black'}}>({props.item?.rating?.length})</span>
    </>
  );
}
