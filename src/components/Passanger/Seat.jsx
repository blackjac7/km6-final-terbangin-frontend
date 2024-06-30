import { useState, useEffect, Fragment } from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";

const SeatSelectionComponent = ({
  title,
  seatType,
  seatsConfirmed,
  seatArrayAll,
  seatAvailable,
  onSeatsSelected,
  adult,
  child,
  // baby,
  capacity,
}) => {
  const [totalSeats, setTotalSeats] = useState(seatArrayAll?.length ?? 0);
  const [seatCols] = useState(6);
  const [seats, setSeats] = useState([]);
  const [adultSeats, setAdultSeats] = useState(0);
  const [childSeats, setChildSeats] = useState(0);
  // const [babySeats, setBabySeats] = useState(0);
  const [seatSelected, setSeatSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onSeatsSelected(seatSelected);
  }, [seatSelected]);

    useEffect(() => {
      if (seatArrayAll === undefined) {
        navigate("/not-found");
      }
        const sortedSeatArray = [...seatArrayAll].sort(
            (a, b) => a.seatNumber - b.seatNumber
        );
        const seatRows = Math.ceil(totalSeats / seatCols);

        const newSeats = Array(seatRows)
            .fill(null)
            .map((_, rowIndex) =>
                Array(seatCols)
                    .fill(null)
                    .map((_, colIndex) => {
                        const seatIndex = rowIndex * seatCols + colIndex;
                        const seatData = sortedSeatArray[seatIndex];
                        return {
                            isSelected: false,
                            isAvailable: seatData
                                ? seatData.isAvailable
                                : false,
                            color: seatData
                                ? determineSeatColor(seatData.seatNumber)
                                : "white",
                            number: seatData ? seatData.seatNumber : null,
                        };
                    })
            );
        setSeats(newSeats);
    }, [seatArrayAll, totalSeats, seatCols]);

  useEffect(() => {
    setTotalSeats(seatArrayAll?.length || 0);
  }, [seatArrayAll, adult, child]);

    const handleSeatClick = (rowIndex, colIndex) => {
        if (!seats[rowIndex][colIndex].isAvailable) {
            toast.error("Kursi tidak tersedia");
            return;
        }

        if (
            capacity === adultSeats + childSeats &&
            !seats[rowIndex][colIndex].isSelected
        ) {
            toast.error("Anda sudah memilih semua kursi yang dibutuhkan");
            return;
        }
        if (seatsConfirmed) return;

    setSeats((prevSeats) => {
      const updatedSeats = prevSeats.map((row, rIdx) => {
        return row.map((seat, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            const seatNumber = seat.number;
            const newColor = seat.isSelected
              ? "white"
              : determineSeatColor(seatNumber);
            let seatCode = null;
            const seatData = seatAvailable.find(
              (s) => s.seatNumber === seatNumber
            );

            if (seat.isSelected) {
              seat = {
                ...seat,
                isSelected: false,
                color: "white",
              };

              if (seat.adult) {
                seat.adult -= 1;
                setAdultSeats(adultSeats - 1);
              } else if (seat.child) {
                seat.child -= 1;
                setChildSeats(childSeats - 1);
              }
            } else {
              if (adultSeats < adult) {
                setAdultSeats(adultSeats + 1);
                seat = {
                  ...seat,
                  isSelected: true,
                  color: newColor,
                  adult: seat.adult ? seat.adult + 1 : 1,
                  seatId: seatData ? seatData?.id : null,
                };
                seatCode = `P${seat.adult}`;
              } else if (childSeats < child) {
                setChildSeats(childSeats + 1);
                seat = {
                  ...seat,
                  isSelected: true,
                  color: newColor,
                  child: seat.child ? adultSeats + seat.child + 1 : 1,
                  seatId: seatData ? seatData.id : null,
                };
                seatCode = `P${seat.child + adultSeats}`;
              }
            }
            return {
              ...seat,
              code: seatCode,
            };
          }
          return seat;
        });
      });
      const selectedSeats = updatedSeats
        .flat()
        .filter((seat) => seat.isSelected);
      setSeatSelected(selectedSeats);
      return updatedSeats;
    });
  };

  const determineSeatColor = (seatNumber) => {
    if (seatNumber < 7 && seatNumber > 0) {
      return "purple";
    } else if (seatNumber < 25 && seatNumber > 6) {
      return "blue";
    } else {
      return "green";
    }
  };

  return (
    <Card
      className="mb-3"
      style={{
        boxShadow: "1px 0 5px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.50rem",
      }}
    >
      <h4 className="mb-0" style={{ marginLeft: "18px", marginTop: "15px" }}>
        {title}
      </h4>
      <Card.Body>
        <div
          style={{
            backgroundColor: "#343a40",
            padding: "10px",
            color: "white",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <h6 className="mb-0" style={{ marginLeft: "4px" }}>
            {seatType === "Bussines" ? "Business" : seatType} -{" "}
            {seatAvailable?.length} Seat Available
          </h6>
        </div>
        <div style={{ padding: "40px" }}>
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="d-flex justify-content-center mb-2">
              {row.map((seat, colIndex) => (
                <Fragment key={colIndex}>
                  <Button
                    className={`seat ${seat.isSelected ? "selected" : ""}`}
                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "7px",
                      top: "10px",
                      textAlign: "center",
                      fontSize: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      backgroundColor: seat.isSelected ? seat.color : "white",
                      color: seat.isSelected ? "white" : "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: seatsConfirmed ? "not-allowed" : "pointer",
                      position: "relative",
                    }}
                    disabled={seatsConfirmed && !seat.isSelected}
                  >
                    <span
                      style={{
                        fontSize: "10px",
                        marginTop: "3px",
                        display: "block",
                      }}
                    >
                      {seat?.code ? seat?.code : seat?.number}
                    </span>
                    {rowIndex === 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-40px",
                          width: "100%",
                          textAlign: "center",
                          fontSize: "18px",
                          color: "gray",
                        }}
                      >
                        {String.fromCharCode(65 + colIndex)}
                      </div>
                    )}
                  </Button>
                  {colIndex === 2 && (
                    <Button
                      className="seat-number-button"
                      style={{
                        width: "40px",
                        height: "40px",
                        margin: "7px",
                        top: "10px",
                        textAlign: "center",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "transparent",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "not-allowed",
                        position: "relative",
                      }}
                      disabled
                    >
                      {`${rowIndex + 1}`}
                    </Button>
                  )}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SeatSelectionComponent;
