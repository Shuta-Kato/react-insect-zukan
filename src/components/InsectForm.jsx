import React, { useState } from "react";
import axios from "axios";

function InsectForm() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("country", country);
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/insect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { img, name, country } = response.data;
      setUploadedUrl(`/uploads/${img}`);
      console.log("アップロード成功", response.data);
    } catch (error) {
      console.error("アップロードに失敗しました", error);
    }
  };

  return (
    <div class="form-content">
      <form onSubmit={handleSubmit}>
        <div class="form-block">
          <label htmlFor="name">昆虫の名前</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div class="form-block">
          <label htmlFor="country">原産地</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <div class="form-block">
          <label htmlFor="image" >写真を追加</label>
          <input type="file" id="image" onChange={handleImageChange} required class="file-button"/>
        </div>

        {uploadedUrl && (
          <div>
            <h3>アップロードされた画像：</h3>
            <img src={uploadedUrl} alt={name} style={{ maxWidth: "200px" }} />
          </div>
        )}
          <div class="form-button-box">
            <button type="submit">登録</button>
          </div>
      </form>
      </div>
  );    
}

export default InsectForm;
