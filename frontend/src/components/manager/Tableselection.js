import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { CREATE_TABLE_MUTATION } from "../../graphql/TableMutation";
import { FETCH_ALL_TABLEBOOKINGSLOT } from "../../graphql/FetchBookingQuery";
import Header from "../admin/Header";

//function UploadImage({onUpload}) {
function Tableselection() {
  const [tableName, setTableName] = useState("");
  const [tableTime, setTableTime] = useState("");
  const [tableDate, setTableDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [available, setAvailable] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of records per page

  const { loading, data, error, refetch } = useQuery(
    FETCH_ALL_TABLEBOOKINGSLOT
  );
  const [createTablebooking] = useMutation(CREATE_TABLE_MUTATION, {
    onCompleted: () => refetch(),
  });

  const duplicate =
    data &&
    data.getAllTableBooking_db &&
    data.getAllTableBooking_db.some(
      (booking) =>
        booking.tableName === tableName &&
        booking.time === tableTime &&
        booking.date === tableDate &&
        booking.capacity === capacity
    );
  // Pagination logic
  const totalPages = Math.ceil(data?.getAllTableBooking_db?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBookings = data?.getAllTableBooking_db?.slice(
    startIndex,
    endIndex
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const validateForm = () => {
    const errors = [];

    if (duplicate) {
      errors.push("This booking already exists");
    }

    setErrorMessages(errors);
    return errors.length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      createTablebooking({
        variables: {
          tableName: tableName,
          time: tableTime,
          date: tableDate,
          capacity: capacity,
          available: available,
        },
      });
      alert(`Time Slot for Table Reservation inserted Successfully`);
    }
  };

  return (
    <>
      <div className="container">
        {/* header section start from here */}
        <Header />

        {/* header section end here */}
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card" id="tablecards">
            <div className="card-header p-3">
              <h4>Add Items</h4>
            </div>
            {errorMessages.length > 0 && (
              <div style={{ color: "#e17a7a" }}>
                <ul>
                  {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div class="card-body">
              <form onSubmit={handleSubmit} class="row">
                <div class="col">
                  <label for="tableName">Table name</label>
                  <select
                    class="form-control custom-select"
                    name="tableName"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                  >
                    {" "}
                    <option value="">Select Table</option>
                    <option value="table1">Table 1</option>
                    <option value="table2">Table 2</option>
                    <option value="table3">Table 3</option>
                    <option value="table4">Table 4</option>
                    <option value="table5">Table 5</option>
                    <option value="table6">Table 6</option>
                    <option value="table7">Table 7</option>
                    <option value="table8">Table 8</option>
                    <option value="table9">Table 9</option>
                    <option value="table10">Table 10</option>
                    {/* Add more options here */}
                  </select>
                </div>
                <div class="col">
                  <label for="time">Table Time</label>
                  <select
                    class="form-control"
                    name="time"
                    value={tableTime}
                    onChange={(e) => setTableTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    <option value="11:00am">11:00 AM</option>
                    <option value="3:00pm">3:00 PM</option>
                    <option value="5:00pm">5:00 PM</option>
                    <option value="7:00pm">7:00 PM</option>
                    <option value="9:00pm">9:00 PM</option>
                    <option value="11:00pm">11:00 PM</option>

                    {/* Add more options here */}
                  </select>
                </div>

                <div class="col">
                  <label for="date">Date</label>
                  <input
                    class="form-control"
                    type="date"
                    name="date"
                    value={tableDate}
                    onChange={(e) => setTableDate(e.target.value)}
                  />
                </div>

                <div class="col form-group ">
                  <label for="capacity">Capacity</label>
                  <select
                    class=" form-control"
                    name="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  >
                    <option value="">Select Capacity</option>
                    <option value="2 People">2</option>
                    <option value="3 People">3 </option>
                    <option value="4 People">4 </option>
                    <option value="5 People">5 </option>
                    <option value="6 People">6 </option>
                    <option value="7 People">7 </option>
                    <option value="8 People">8 </option>
                    <option value="9 People">9 </option>
                    <option value="10 People">10 </option>
                    <option value="Private Room">Private Room</option>
                    {/* Add more options here */}
                  </select>
                </div>

                <div class="col" style={{ marginTop: "25px" }}>
                  <button type="submit" class="btn btn-primary">
                    Add Tables
                  </button>
                </div>
              </form>
            </div>

            <div className="card mt-5">
              <div className="card-header p-3">
                <h4>Booking Data</h4>
              </div>
              <div class="card-body">
                <table class="table table-striped">
                  <thead class="table table-dark">
                    <tr>
                      <th>Table Name</th>
                      <th>Time</th>
                      <th>Date</th>
                      <th>Capacity</th>
                      <th>Available</th>
                      <th>Fistname</th>
                      <th>Lastname</th>
                      <th>Phone number</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBookings &&
                      paginatedBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td>{booking.tableName}</td>
                          <td>{booking.time}</td>
                          <td>{booking.date}</td>
                          <td>{booking.capacity}</td>
                          <td>{booking.available ? "Yes" : "No"}</td>
                          <td>{booking.firstname}</td>
                          <td>{booking.lastname}</td>
                          <td>{booking.phonenumber}</td>
                          <td>{booking.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="pagination">
                  <button
                    className="btn btn-primary"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="currentPage">{currentPage}</span>
                  <button
                    className="btn btn-primary"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Tableselection;
