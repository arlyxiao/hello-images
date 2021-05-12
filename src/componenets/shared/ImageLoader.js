import React from "react";

const ImageLoader = function(props) {
  let listItems = '';

  try {
    listItems = props.images.map((image) =>
      <li key={image.largeImageURL}>
        { image.largeImageURL }
      </li>
    );
  } catch (error) {
  }

  return (
    <ul>{listItems}</ul>
  );
};

export default ImageLoader;
