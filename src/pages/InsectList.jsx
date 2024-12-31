import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function insectList() {
  const [insectList, setInsectList] = useState([]);

  useEffect(() => {
    const storedInsects = JSON.parse(localStorage.getItem("insectList")) || [];
    setInsectList(storedInsects);
  }, []);

  return (
    <div>
      <h2>昆虫一覧</h2>
      {insectList.length === 0 ? (
        <p>昆虫が登録されていません。</p>
      ) : (
        <ul>
          {insectList.map((insect, index) => (
            <li key={index}>
              <Link
                to={`/template?name=${insect.name}&img=${insect.img}&country=${insect.country}`}
              >
                <h3>{insect.name}</h3>
                <img src={insect.img} alt={insect.name} width="100" />
                <p>原産地：{insect.country}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default insectList;
