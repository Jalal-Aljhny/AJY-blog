const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 82px)",
      }}
    >
      <small className="error">
        This route is Not Found !!!... Return to home page ...
      </small>
    </div>
  );
};

export default NotFound;
