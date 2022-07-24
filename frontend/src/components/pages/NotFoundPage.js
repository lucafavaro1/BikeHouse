// function to render the not found page

import notFound from "../pictures/404.jpg";
import "../css/NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="notFoundPage row">
      <div className="col-2"></div>
      <div className="col-8" style={{ textAlign: "center" }}>
        <img src={notFound} style={{ width: 80 + "%" }} />
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default NotFoundPage;
