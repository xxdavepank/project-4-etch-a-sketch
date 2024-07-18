"use client";
import Canvas from "./components/Canvas.js";
import React from "react";
export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-2 justify-items-center">
        <Canvas />
        <footer>
          <div className="footer footer-center grid grid-cols-1 gap-2 justify-items-center">
            <h5>Copyright © lawrd 2023</h5>
          </div>
        </footer>
      </div>
    </>
  );
}
