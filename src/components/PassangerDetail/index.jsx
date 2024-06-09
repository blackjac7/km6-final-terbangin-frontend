const PassangerDetail = ({ index, passangerName, passangerId }) => {
  return (
    <>
      <p style={{ marginBottom: 0 }}>
        Penumpang {index + 1}: {passangerName}
      </p>
      <p style={{ marginBottom: 0 }}>ID: {passangerId}</p>
    </>
  );
};

export default PassangerDetail;
