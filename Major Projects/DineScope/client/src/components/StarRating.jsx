import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";

/**
 * StarRating component
 *
 * Props:
 * - rating (number): the current rating to display
 * - onChange (function, optional): callback for interactive mode
 * - readOnly (boolean, default false): whether user can change stars
 */
function StarRating({ rating = 0, onChange, readOnly = false }) {
  const [value, setValue] = useState(rating);

  // Sync internal state when rating prop changes
  useEffect(() => {
    setValue(rating);
  }, [rating]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Rating
      name="half-rating"
      value={value}
      precision={0.5}
      readOnly={readOnly}
      onChange={readOnly ? undefined : handleChange}
      sx={{
        "& .MuiRating-iconFilled": {
          color: "#FFD700", // gold
        },
        "& .MuiRating-iconEmpty": {
          color: "#FFD700", // gold outline
        },
      }}
    />
  );
}

export default StarRating;
