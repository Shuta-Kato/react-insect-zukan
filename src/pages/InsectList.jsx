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
      <div class="page-title-box">
        <h2>図鑑</h2>
      </div>

      {insectList.length === 0 ? (
        <p>昆虫が登録されていません。</p>
      ) : (
        <ul class="list-linkText-color">
          {insectList.map((insect, index) => (
            <Link
              to={`/template?name=${encodeURIComponent(
                insect.name
              )}&img=${encodeURIComponent(
                "/uploads/" + insect.img
              )}&country=${encodeURIComponent(insect.country)}`}
            >
              <li key={index} class="list-container">
                <img src={`/uploads/${insect.img}`} alt={insect.name} />
                <div class="list-items">
                  <h3>{insect.name}</h3>
                  <p>原産地：{insect.country}</p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default insectList;
