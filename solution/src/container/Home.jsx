import React, { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { useFetch } from "../hooks/useFetch";
import "./home.css";

const Home = () => {
  const tableHeaders = ["S.No.", "Percentage funded", "Amount pledged"];
  const [tableContent, setTableContent] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { doGet } = useFetch();

  const handlePageCount = (value) => {
    if (value > 0 && value <= tableContent?.length) setItemsPerPage(value);
  };

  const fetchContent = async () => {
    const url =
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
    const data = await doGet(url);

    const getValidKeys = (data) => {
      const keys = ["s.no", "percentage.funded", "amt.pledged"];
      return keys?.map((item) => data?.[item]);
    };
    const formatData = data?.map(getValidKeys);
    setTableContent(formatData);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <main className={"home-container"}>
      <header className={"home-header"}>
        <h1>Frontend Assignment</h1>
        <div className={"items-per-page"}>
          <label htmlFor="items-per-page">Items per page:</label>
          <input
            name="itemCount"
            type="number"
            min={5}
            value={itemsPerPage}
            onChange={(e) => handlePageCount(e?.target?.value)}
          />
        </div>
      </header>
      <section className={"home-section"}>
        <Table
          headers={tableHeaders}
          content={tableContent}
          itemsPerPage={itemsPerPage}
        />
      </section>
    </main>
  );
};

export { Home };
