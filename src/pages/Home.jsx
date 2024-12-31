import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [insectName, setInsectName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!insectName || !imageUrl || !country) {
      alert("未入力の項目があります。");
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

    navigate(`/template?name=${insectName}&img=${imageUrl}&country=${country}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result;
        setImageUrl(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>図鑑に昆虫を登録する</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>昆虫の名前：</label>
          <input
            type="text"
            value={insectName}
            onChange={(e) => setInsectName(e.target.value)}
          />
        </div>
        <div>
          <label>画像の追加</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <div>
          <label>原産地</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
}

export default Home;
