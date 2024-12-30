import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [insectName, setInsectName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/template?name=${insectName}&img=${imageUrl}&country=${country}`);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
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
      <Link to="/template">Template</Link>
    </div>
  );
}

export default Home;
