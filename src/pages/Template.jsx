import React, { useEffect, useState } from "react";

function Template() {
  const [insectData, setInsectData] = useState({
    name: "",
    img: "",
    country: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("insectList");
    if (storedData) {
      const insectList = JSON.parse(storedData);
      const lastInsectData = insectList[insectList.length - 1]; 
      setInsectData(lastInsectData);
    }
  }, []);

  if (!insectData.name || !insectData.img || !insectData.country) {
    return <div>必要な情報が不足しています。</div>;
  }

  return (
    <div>
      <h2>{insectData.name}</h2>
      <img src={insectData.img} alt={insectData.name} />
      <p>原産地：{insectData.country}</p>
    </div>
  );
}

export default Template;
