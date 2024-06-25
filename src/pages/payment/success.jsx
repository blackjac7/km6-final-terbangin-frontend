import { Breadcrumbs, Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import HeaderShadow from "../../components/HeaderShadow";

import { useState, useEffect } from "react";
import { Button, Container, Image } from "react-bootstrap";
import "./success.css";

const PaymentSuccess = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* Header */}
            <HeaderShadow>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    className="pt-4"
                    aria-label="breadcrumb"
                    style={{
                        fontWeight: "700",
                        fontSize: "23px",
                        color: "black",
                    }}
                >
                    <Link underline="none" key="1" color="inherit">
                        Isi Data Diri
                    </Link>
                    <Link underline="none" key="2" color="inherit">
                        Bayar
                    </Link>
                    <Link
                        underline="none"
                        key="3"
                        color="inherit"
                        style={{
                            fontWeight: "700",
                            fontSize: "23px",
                            color: "black",
                        }}
                    >
                        Selesai
                    </Link>
                </Breadcrumbs>
            </HeaderShadow>

            {/* Main Content */}
            <Container id={"content"}>
                <Image
                    src={"/payment-success-illustration.svg"}
                    fluid={true}
                    id={"paymentSuccessIllustration"}
                    className={"mb-3"}
                />
                <h4 id={"selamat"}>Selamat!</h4>
                <h4>Transaksi pembayaran tiket sukses!</h4>
                <Button className={"paymentSuccessBtn mt-5"}>
                    Terbitkan Tiket
                </Button>
                <br />
                <Button className={"paymentSuccessBtn"}>
                    Cari penerbangan lain
                </Button>
            </Container>
        </>
    );
};

export default PaymentSuccess;
