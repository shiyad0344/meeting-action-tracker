function Filters({ setFilter }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("pending")}>Pending</button>
      <button onClick={() => setFilter("done")}>Done</button>
    </div>
  );
}

export default Filters;
