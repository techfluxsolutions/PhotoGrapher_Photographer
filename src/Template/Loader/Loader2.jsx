const Loader2 = ({ percentage = 0 }) => (
  <div style={loaderStyles.container}>
    <div style={loaderStyles.modal}>

      <div style={loaderStyles.progressWrapper}>
        <div
          style={{
            ...loaderStyles.progressFill,
            width: `${percentage}%`,
          }}
        />
      </div>

      <p style={loaderStyles.text}>{percentage}% Uploading...</p>

    </div>
  </div>
);

const loaderStyles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  modal: {
    background: "#faf9f6",
    padding: "30px 40px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: "300px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  progressWrapper: {
    width: "100%",
    height: "10px",
    background: "#e6dccf",
    borderRadius: "10px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#4a3326",
    transition: "width 0.3s ease",
  },

  text: {
    marginTop: "12px",
    color: "#4a3326",
    fontSize: "15px",
    fontWeight: "600",
  },
};

export default Loader2;