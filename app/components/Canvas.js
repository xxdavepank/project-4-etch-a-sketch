import React, { useRef, useEffect, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [background, setBackground] = useState("#FFFFFF");
  const [line, setLine] = useState(1);
  const [isEraser, setIsEraser] = useState(false);
  const [penColor, setpenColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    setCtx(context);
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.lineWidth = line;
    }
  }, [line, ctx]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctx.strokeStyle = isEraser ? background : penColor;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
  };

  const handlePenColorChange = (e) => {
    setpenColor(e.target.value);
  };

  const handlePenSizeChange = (e) => {
    setLine(e.target.value);
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    // Set canvas dimensions
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // Draw background color
    tempCtx.fillStyle = background; // Replace with your background color state
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw main canvas content
    tempCtx.drawImage(canvas, 0, 0);

    // Create download link
    const link = document.createElement("a");
    link.download = "canvas_image.png";
    link.href = tempCanvas.toDataURL();

    // Trigger download
    link.click();
  };

  return (
    <div className={`flex justify-center items-center font-serif`}>
      <div className="grid grid-cols-1 gap-2 justify-items-center">
        <button
          onClick={toggleEraser}
          className={`input m-1 w-20 ${
            isEraser ? "bg-red-500" : "bg-blue-500"
          } text-white`}
        >
          {isEraser ? "Eraser Mode" : "Pen Mode"}
        </button>

        <label>Background Color:</label>
        <input
          type="color"
          value="background"
          onChange={handleBackgroundChange}
          className={"input m-1"}
          style={{ backgroundColor: background, padding: 20 }}
        />

        <h1>Pen Color:</h1>
        <input
          type="color"
          value="background"
          onChange={handlePenColorChange}
          className={"input m-1"}
          style={{ backgroundColor: penColor, padding: 20 }}
        />
        <label className={"font-serif"}>Pen Size:</label>
        <input
          type="number"
          value={line}
          onChange={handlePenSizeChange}
          className="input m-1 w-20"
        />
      </div>

      <canvas
        ref={canvasRef}
        width={560}
        height={420}
        className="m-5 border-2 rounded-lg"
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        style={{ backgroundColor: background }}
      ></canvas>
      <div className="grid grid-cols-1 gap-2 justify-items-center">
        <button
          className="input m-1 w-20 mb-20 bg-red-500 text-white"
          onClick={resetCanvas}
        >
          Reset Canvas
        </button>
        <button className="h" onClick={saveCanvas}>
          <p className="mb-0" style={{ fontSize: 50 }}>
            &#x1F970;
          </p>
          <br />
          Save your work
        </button>
      </div>
    </div>
  );
};

export default Canvas;
