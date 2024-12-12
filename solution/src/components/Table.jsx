import { useEffect, useState } from "react";
import "./table.css";

const Table = ({ headers = [], content = [], itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(content.length / itemsPerPage) - 1;

  const handlePageChange = (page) => {
    if (page >= 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const [filteredContent, setFilteredContent] = useState(() =>
    content.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  );

  useEffect(() => {
    setFilteredContent(
      content.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
  }, [currentPage, content, itemsPerPage]);

  return (
    <div className="table-container">
      <table className="table">
        <RenderHead />
        <RenderBody />
      </table>
      {totalPages > 0 && RenderPagination()}
    </div>
  );

  function RenderHead() {
    return (
      <thead className="table-head">
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  }

  function RenderBody() {
    return (
      <tbody className="table-body">
        {filteredContent.map((row) => (
          <tr key={row}>
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }

  function RenderPagination() {
    return (
      <div className="table-footer">
        <button
          disabled={currentPage === 0}
          onClick={() => handlePageChange(0)}
        >
          First
        </button>
        <button
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          Goto:
          <input
            name="pageNo"
            type="number"
            value={currentPage}
            onChange={(e) => handlePageChange(parseInt(e.target.value))}
            min={0}
            max={totalPages}
          />
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          Last
        </button>
      </div>
    );
  }
};

export { Table };
