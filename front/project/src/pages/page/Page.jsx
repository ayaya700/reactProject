import OnePost from "../../components/onepost/OnePost";
import Sidebar from "../../components/sidebar/Sidebar";
import "./page.css";

export default function Page() {
  return (
    <div className="page">
      <OnePost />
      <Sidebar />
    </div>
  );
}
