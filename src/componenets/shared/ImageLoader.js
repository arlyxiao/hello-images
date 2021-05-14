import React from "react";


const ImageLoader = function(props) {
  let listItems = "";

  try {
    listItems = props.images.map((image) =>
      <li key={image.largeImageURL}>
        <img src={ image.userImageURL } />
        <span className="views">
          { `${image.views} Views` }
        </span>
        <span className="likes">
          { `${image.likes} Likes` }
        </span>
      </li>
    );
  } catch (error) {
  }

  const Images = function() {
    return (
      <ul>{listItems}</ul>
    );
  }

  return (
    <>
      <Images />
    </>
  );
};

export default ImageLoader;
