import PropTypes from "prop-types";
const Progress = ({ progress }) => {
  return (
    <div
      style={{
        position: "sticky",
        top: "0",
        left: "0",
        width: `${progress}%`,
        height: "5px",
        zIndex: "1000",
        backgroundColor: "#1565d8",
        borderRadius: "0 100px 100px 0",
      }}
    ></div>
  );
};
Progress.propTypes = {
  progress: PropTypes.number,
};

export default Progress;
