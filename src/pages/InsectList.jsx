import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function insectList() {
  const [insectList, setInsectList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insects")
      .then((response) => {
        setInsectList(response.data);
      })
      .catch((error) => {
        console.error("昆虫の情報取得に失敗しました。", error);
      });
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
                to={`/template?name=${encodeURIComponent(
                  insect.name
                )}&img=${encodeURIComponent(
                  "/uploads/" + insect.img
                )}&country=${encodeURIComponent(insect.country)}`}
              >
                <h3>{insect.name}</h3>
                <img
                  src={`/uploads/${insect.img}`}
                  alt={insect.name}
                  width="100"
                />
              </Link>
              <p>原産地：{insect.country}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default insectList;
