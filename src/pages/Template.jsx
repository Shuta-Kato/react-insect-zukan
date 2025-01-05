import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Template() {
  const [insectData, setInsectData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.insectData) {
      setInsectData(location.state.insectData);
    } else {
      const storedData = localStorage.getItem("insectList");
      if (storedData) {
        setInsectData(JSON.parse(storedData));
      }
    }
  }, [location.state]);

  if (!insectData) {
    return <div>昆虫の情報がありません。</div>;
  }

  return (
    <div>
      <div>
        <h2>{insectData.name}</h2>
        <img src={`/uploads/${insectData.img}`} alt={insectData.name} />
        <p>原産地：{insectData.country}</p>
      </div>
    </div>
  );
}

export default Template;
