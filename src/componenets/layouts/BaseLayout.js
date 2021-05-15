import * as React from "react";


const BaseLayout = ({ children }) => {
  return (
    <div className="base-layout">
      { children }

      <footer>
        Copyright by Test Inc....
      </footer>
    </div>
  )
}

export default BaseLayout;
