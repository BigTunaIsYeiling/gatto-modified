"use client";
import React from "react";
import animationData from "@/app/Animation.json";
import Lottie from "lottie-react";

const LoadingScreen = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      // background: "linear-gradient(180deg, #ffffff, #ffdda1)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      overflow: "hidden",
    }}
  >
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ height: 300, width: 300 }}
    />
  </div>
);

export default LoadingScreen;
