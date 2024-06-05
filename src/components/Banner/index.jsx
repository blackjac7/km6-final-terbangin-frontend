import Banner from "../../assets/img banner.png";

const banner = () => {
  return (
    <div
      className="position-relative mt-5"
      style={{
        backgroundColor: "#b892da",
        height: "150px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        top: "25px",
      }}
    >
      <img
        src={Banner}
        alt="Banner"
        style={{
          height: "200px",
          position: "relative",
          bottom: "25px",
        }}
      />
    </div>
  );
};

export default banner;
