import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BOOK_TABLE_MUTATION } from "../../graphql/BookTableMutation";
import { FETCH_ALL_TABLEBOOKINGSLOT } from "../../graphql/FetchBookingQuery";
import { CUSTOMER_EXIST_QUERY } from "../../graphql/CheckExistingCustomer";

import Header from "./Header";

function Table() {
  const { loading, error, data } = useQuery(FETCH_ALL_TABLEBOOKINGSLOT);
  const [bookTable] = useMutation(BOOK_TABLE_MUTATION);
  const [customerExist] = useMutation(CUSTOMER_EXIST_QUERY);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Select date");
  const [selectedTime, setSelectedTime] = useState("Select time");
  const [selectedCapacity, setSelectedCapacity] = useState("Select capacity");
  const [selectedTable, setSelectedTable] = useState("Select table");
  const [firstName, setFirstName] = useState(""); // Added state variables
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    // Fetch customer data if email is available
    const storedEmail = localStorage.getItem("CustomerEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchCustomerData(storedEmail);
    }
  }, []);

  async function fetchCustomerData(email) {
    try {
      const { data } = await customerExist({ variables: { email } });
      if (data.checkExistingCustomerwithemailonly) {
        const { Firstname, Mobile } = data.checkExistingCustomerwithemailonly;
        setFirstName(Firstname);
        setPhoneNumber(Mobile);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  }

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value.toString());
  };

  function handleReservationClick() {
    const availableSlots = data.getAllTableBooking_db.filter(
      (slot) => slot.available === true
    );
    if (availableSlots.length === 0) {
      setErrorMessages(["No available slots for the current date."]);
      return;
    }
    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!firstName.trim()) {
      setErrorMessages(["First name is required"]);
      return;
    }

    if (!phoneNumber) {
      setErrorMessages(["Phone number is required"]);
      return;
    }
    try {
      const {
        data: { bookTable: bookedTable },
      } = await bookTable({
        variables: {
          tableName: selectedTable,
          date: selectedDate,
          time: selectedTime,
          capacity: selectedCapacity,
          firstname: firstName, // Updated to use state variables
          lastname: lastName,
          phonenumber: parseInt(phoneNumber),
          email: email,
        },
      });
      setSuccessMessage(
        `Congratulations! You've made a reservation for ${bookedTable.date}, ${bookedTable.time}, ${bookedTable.capacity}, at ${bookedTable.tableName}. See you soon.`
      );
      setErrorMessages([]);
    } catch (error) {
      console.error("Error booking table:", error);
    }
  }

  useEffect(() => {
    if (successMessage) {
      // Clear success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract unique dates
  const uniqueDates = [
    ...new Set(data.getAllTableBooking_db.map((slot) => slot.date)),
  ];

  // Filter available times based on selected date
  const availableTimes = [
    ...new Set(
      data.getAllTableBooking_db
        .filter((slot) => slot.available && slot.date === selectedDate)
        .map((slot) => slot.time)
    ),
  ];

  // Filter available capacities based on selected time and date
  const availableCapacities = [
    ...new Set(
      data.getAllTableBooking_db
        .filter(
          (slot) =>
            slot.available &&
            slot.date === selectedDate &&
            slot.time === selectedTime
        )
        .map((slot) => slot.capacity)
    ),
  ];

  // Filter available tables based on selected capacity, time, and date
  const availableTables = [
    ...new Set(
      data.getAllTableBooking_db
        .filter(
          (slot) =>
            slot.available &&
            slot.date === selectedDate &&
            slot.time === selectedTime &&
            slot.capacity === selectedCapacity
        )
        .map((slot) => slot.tableName)
    ),
  ];

  return (
    <>
      {/* header section start from here */}
      <Header />
      {/* header section end here */}

      {successMessage && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      <div class="book-table section bg-light">
        <div class="book-table-shape">
          <img src="/img/table-leaves-shape.png" alt="" />
        </div>

        <div class="book-table-shape book-table-shape2">
          <img src="/img/table-leaves-shape.png" alt="" />
        </div>

        <div class="sec-wp">
          <div class="row">
            <div class="col-lg-12">
              <div class="sec-title text-center ">
                <h1 class="special-head text-center">
                  {" "}
                  BOOK <span>YOUR TABLE</span>
                </h1>
                <p class="sec-sub-para">
                  You can call on this number or you can reserve table by
                  filling folowing form
                </p>
                <div class="sec-title-shape mb-4">
                  <img src="/img/title-shape.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div class="book-table-info">
            <div class="row align-items-center">
              <div class="col-lg-4">
                <div class="table-title text-center">
                  <h3>Monday to Thrusday</h3>
                  <p>9:00 am - 22:00 pm</p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="call-now text-center">
                  <a href="tel:+91-8866998866">+91 - 8866998866</a>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="table-title text-center">
                  <h3>Friday to Sunday</h3>
                  <p>11::00 am to 20:00 pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="section-break w-50 mx-auto"></h2>

      <div class="oder">
        <div class="row">
          <div class="col-lg-12">
            <div class="sec-title text-center ">
              <p class="sec-sub-title ">Reserve Your Spot</p>
              <p class="sec-sub-para">
                You can call on this number or you can reserve table by filling
                folowing form
              </p>
            </div>
          </div>
        </div>

        <div class="oder_main">
          <div class="form-row row">
            <div class="form-container  ">
              <form class="checkout-form" onSubmit={handleSubmit}>
                <div class="row">
                  <h3>Personal Information :</h3>
                  <div class="col">
                    <label for="first-name"> First Name</label>

                    <input
                      id="Firstname"
                      type="text"
                      value={firstName} // Add this line
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-control"
                      placeholder="Enter First name"
                      name="Firstname"
                    />

                    {errorMessages.includes("First name is required") && (
                      <p className="text-danger">First name is required</p>
                    )}
                  </div>

                  <div class="col">
                    <label for="last-name"> Last Name</label>
                    <input
                      id="Lastname"
                      type="text"
                      value={lastName} // Add this line
                      onChange={(e) => setLastName(e.target.value)}
                      className="form-control"
                      placeholder="Enter Last name"
                      name="Lastname"
                    />
                  </div>

                  <div class="col">
                    <label for="number"> Phone number</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                      value={phoneNumber} // Add this line
                      onChange={(e) => handlePhoneNumberChange(e.target.value)}
                      id="Mobile"
                      name="Mobile"
                    />
                    {errorMessages.includes("Phone number is required") && (
                      <p className="text-danger">Phone number is required</p>
                    )}
                  </div>

                  <div class="col">
                    <label for="email"> Email</label>

                    <input
                      type="Email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={email} // Add this line
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                    />
                  </div>
                </div>

                <h2 class="section-break"></h2>

                <div class="row">
                  <h3>Select Table :</h3>

                  <div class="col">
                    <label for="Table">Date (select one):</label>
                    <select
                      class="form-control"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option disabled>Select date</option>
                      {/* Populate options with unique dates */}
                      {uniqueDates
                        .filter((date) =>
                          data.getAllTableBooking_db.some(
                            (slot) =>
                              slot.date === date && slot.available === true
                          )
                        )
                        .map((date) => (
                          <option key={date} value={date}>
                            {date}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div class="col">
                    <label for="Table">Time (select one):</label>
                    <select
                      class="form-control"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option disabled>Select time</option>
                      {/* Populate options with available times */}
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <label for="person">person:</label>
                    <select
                      class="form-control"
                      value={selectedCapacity}
                      onChange={(e) => setSelectedCapacity(e.target.value)}
                    >
                      <option disabled>Select capacity</option>
                      {/* Populate options with available capacities */}
                      {availableCapacities.map((capacity) => (
                        <option key={capacity} value={capacity}>
                          {capacity}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div class="col">
                    <label for="Table">Table (select one):</label>
                    <select
                      class="form-control"
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                    >
                      <option disabled>Select table</option>
                      {/* Populate options with available tables */}
                      {availableTables.map((table) => (
                        <option key={table} value={table}>
                          {table}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div class="col">
                  <button type="submit" class="submit-button mt-3 a_button">
                    Book Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
