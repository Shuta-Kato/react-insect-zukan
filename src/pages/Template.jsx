import React from "react";
import { useLocation } from "react-router-dom";

function Template() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const insectName = params.get("name");
  const imageUrl = params.get("img");
  const country = params.get("country");

  if (!insectName || !imageUrl || !country) {
    return <div>必要な情報が不足しています。</div>;
  }

  return (
    <div>
      <h2>{insectName}</h2>
      <img src={imageUrl} alt={insectName} />
      <p>原産地：{country}</p>
    </div>
  );
}

export default Template;
