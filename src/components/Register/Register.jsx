import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { generateOTP } from "../../redux/actions/verify";
import { toast } from "react-toastify";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [photo, setPhoto] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Nama tidak boleh kosong");
            return;
        }
        if (!email) {
            toast.error("Email tidak boleh kosong");
            return;
        }
        if (!phone) {
            toast.error("Nomor telepon tidak boleh kosong");
            return;
        }
        if (!password) {
            toast.error("Password tidak boleh kosong");
            return;
        }

        dispatch(
            generateOTP(
                navigate,
                name,
                email,
                phone,
                password,
                photo,
                setLoading
            )
        );
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Contoh: john@gmail.com"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTelepon">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                    type="tel"
                    placeholder="+62"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Buat Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Buat Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </Form.Group>

            <Form.Group controlId="picture" className="mb-3">
                <Form.Label>Picture</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                />
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                style={{ borderRadius: "12px", backgroundColor: "#7126B5" }}
                disabled={loading}
            >
                {loading ? "Loading..." : "Daftar"}
            </Button>

            <div className="text-center mb-3">
                Sudah punya akun?
                <Link to="/login" style={{ color: "#7126B5" }}>
                    Masuk disini
                </Link>
            </div>
        </Form>
    );
}

export default Register;
