"use client";
import * as React from "react";
import { Canvas, ReactSketchCanvas } from "react-sketch-canvas";
import { useState, useRef } from "react";
import ToolsContainer from "./Tools/ToolsContainer";
import { EraserIcon, LucideRemoveFormatting, PenBoxIcon } from "lucide-react";
import { Colors } from "@/constant/Colors";

const DrawingArea = () => {
  const [activeColor, setActiveColor] = useState("white");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [earserWidth, setEraserWidth] = useState(10);
  const canvasRef = useRef(null);
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: `0.5rem`,
  };

  const handleColorClick = (color: string) => {
    setActiveColor(color);
  };

  const EraseCanvasFunction = () => {
    canvasRef.current?.eraseMode(earserWidth);
  };

  const StrokeFunction = () => {
    canvasRef.current?.eraseMode(false);
  };
  const ResetCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <section>
      <section className="absolute top-10 left-10 w-20 z-10 group rounded-md border border-[#BCB59F] flex flex-1 flex-col justify-center items-center bg-toolscolor text-[#BCB59F] overflow-hidden">
        <ToolsContainer
          icon={PenBoxIcon}
          label="Pen"
          onClick={StrokeFunction}
        />
        <hr className="w-full opacity-25 bg-[#BCB59F]" />
        <ToolsContainer
          icon={EraserIcon}
          label="Erase"
          onClick={EraseCanvasFunction}
        />
        <hr className="w-full opacity-25 bg-[#BCB59F]" />

        <ToolsContainer
          icon={LucideRemoveFormatting}
          label="Reset"
          onClick={ResetCanvas}
        />
      </section>
      <section className="absolute flex flex-col flex-1 items-center gap-2 top-2 left-0 right-0 z-10 w-max space-y-2 m-auto px-5 py-2 rounded-md border border-[#BCB59F] bg-toolscolor text-[#BCB59F] overflow-hidden">
        <div className="colorpickercontainer flex justify-center items-center gap-5">
          {Colors.map((color: any) => {
            return (
              <button
                key={color.value}
                className={`w-6 h-6 rounded-full ${
                  activeColor === color.name ? "border-2 border-[#BCB59F]" : ""
                }`}
                style={{ backgroundColor: color.name }}
                onClick={() => handleColorClick(color.name)}
              />
            );
          })}
        </div>

        <hr className="w-full opacity-25 bg-[#BCB59F]" />
        <div className="ChangerWidthContainer flex justify-center items-center gap-2 flex-col">
          <div className="penstrokecontainer space-x-5">
            <input
              type="range"
              min="1"
              max="100"
              value={strokeWidth}
              onChange={(e: any) => setStrokeWidth(e.target.value)}
            />
            <label>stroke width</label>
          </div>
          <div className="strokecontainer space-x-5">
            <input
              type="range"
              min="1"
              max="100"
              value={earserWidth}
              onChange={(e: any) => setEraserWidth(e.target.value)}
            />
            <label>erase width</label>
          </div>
        </div>
      </section>
      <ReactSketchCanvas
        ref={canvasRef}
        style={styles}
        width="100vw"
        height="100vh"
        strokeWidth={strokeWidth}
        eraserWidth={earserWidth}
        strokeColor={activeColor}
        canvasColor="bg-background"
      />
    </section>
  );
};

export default DrawingArea;
