import { Row, Col } from "react-bootstrap";

const Price = () => {
  return (
    <>
      <hr />
      <p style={{ marginBottom: 0, fontWeight: "bold" }}>Rincian Harga</p>
      <Row>
        <Col xs={6} md={6}>
          2 Adults
        </Col>
        <Col xs={6} md={6}>
          IDR 9.550.000
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={6}>
          1 Baby
        </Col>
        <Col xs={6} md={6}>
          IDR 0
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6} md={6}>
          Tax
        </Col>
        <Col xs={6} md={6}>
          IDR 300.000
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>Total</Col>
        <Col xs={6} md={6}>
          IDR 9.550.000
        </Col>
      </Row>
    </>
  );
};

export default Price;
