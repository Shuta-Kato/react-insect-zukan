import InsectForm from "../components/InsectForm";

function Home() {
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
