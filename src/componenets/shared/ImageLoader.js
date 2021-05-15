import React, { useEffect, useState } from "react";


const LazyImage = function(props) {
  const placeholderImg = "https://via.placeholder.com/200x200.png?text=Image+Loading"
  const errorImg = "https://via.placeholder.com/200x200.png?text=Not+Available"
  const src = props.src;
  const [imgSrc, setSrc] = useState(placeholderImg || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.addEventListener("load", () => {
      setSrc(src);
    });

    img.addEventListener("error", () => {
      setSrc(errorImg || placeholderImg);
    });

  }, [src, placeholderImg, errorImg]);

  return <img {...props} src={imgSrc} />;
};


const ImageLoader = function(props) {
  const images = props.images;

  return (
    <>
      <ul>
        {images.length > 0 && props.images.map((image) =>
          <li key={image.largeImageURL} >
            <LazyImage src={image.userImageURL} />

            <span className="views">
              { `${image.views} Views` }
            </span>

            <span className="likes">
              { `${image.likes} Likes` }
            </span>
          </li>
        )}
      </ul>
    </>
  );

};

export default ImageLoader;
