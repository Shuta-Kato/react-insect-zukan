import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Template() {
  const [insectData, setInsectData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const img = queryParams.get("img");
    const country = queryParams.get("country");

    console.log("クエリパラメータ:", { name, img, country });

    if (name && img && country) {
      setInsectData({ name, img, country });
    }
  }, [location.search]);

  if (!insectData) {
    return <div>昆虫の情報がありません。</div>;
  }

  return (
    <div>
      <h2>{insectData.name}</h2>
      <img
        src={insectData.img}
        alt={insectData.name}
        style={{ maxWidth: "800px" }}
      />
      <p>原産地：{insectData.country}</p>
    </div>
  );
}

export default Template;
