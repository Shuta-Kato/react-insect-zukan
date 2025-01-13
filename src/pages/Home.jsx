import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InsectForm from "../components/InsectForm";

function Home() {
  const [insectName, setInsectName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!insectName || !country || !imageUrl) {
      alert("未入力の項目があるか、画像がアップロードがされていません。");
      return;
    }

    const newInsectData = {
      name: insectName,
      img: imageUrl,
      country: country,
    };

    const existingData = JSON.parse(localStorage.getItem("insectList")) || [];

    existingData.push(newInsectData);

    localStorage.setItem("insectList", JSON.stringify(existingData));

    setInsectName("");
    setImageUrl("");
    setCountry("");

    navigate("/template");
  };

  return (
      <div class="article-container">
        <div class="form-head-container">
          <div class="form-head">
            <h2>図鑑に昆虫を登録する</h2>
          </div>
        </div>
        <InsectForm />
      </div>
  );
}

export default Home;
