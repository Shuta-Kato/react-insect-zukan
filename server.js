import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";
import mysql from "mysql2";

// アップロードディレクトリを作成
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const app = express();
const PORT = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "insect_db",
});

db.connect((err) => {
  if (err) {
    console.error("データベース接続エラー：", err);
    return;
  }
  console.log("MySQLデータベースに接続しました。");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multerの設定（ファイル保存先とファイル名）
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// 画像ファイル形式のバリデーション追加
const upload = multer({
  storage: storage,
});

app.post("/api/insect", upload.single("image"), (req, res) => {
  const { name, country } = req.body;
  const image = req.file.filename;

  const query = "INSERT INTO insects (name, country, img) VALUES (?, ?, ?)";
  db.query(query, [name, country, image], (err, results) => {
    if (err) {
      console.error("データベース挿入エラー", err);
      return res
        .status(500)
        .json({ error: "データベースに保存出来ませんでした。" });
    }
  });

  res.json({ name, country, img: image });
});

app.get("/api/insects", (req, res) => {
  db.query("SELECT * FROM insects", (err, results) => {
    if (err) {
      console.error("データベース取得エラー:", err);
      return res.status(500).json({ error: "データの取得に失敗しました。" });
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
