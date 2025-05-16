import React, { useEffect } from "react";
import Header from "./Header";


function Table() {
    return (
        <>
            {/* header section start from here */}
            <Header />
            {/* header section end here */}



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
                                <p class="sec-sub-para">You can call on this number or you can reserve table by filling folowing form</p>
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
                            <p class="sec-sub-para">You can call on this number or you can reserve table by filling folowing form</p>

                        </div>
                    </div>
                </div>

                <div class="oder_main">




                    <div class="form-row row">
                        <div class="form-container  ">
                            <form class="checkout-form">
                      

                                <div class="row">
                                    <h3>Personal Information :</h3>
                                    <div class="col">
                                        <label for="first-name"> First Name</label>

                                        <input
                                            id="Firstname"
                                            type="text"
                                            readOnly
                                            className="form-control"
                                            placeholder="Enter First name"
                                            name="Firstname"

                                        />
                                    </div>

                                    <div class="col">
                                        <label for="first-name"> Last Name</label>
                                        <input
                                            id="Lastname"
                                            type="text"
                                            readOnly
                                            className="form-control"
                                            placeholder="Enter Last name"
                                            name="Lastname"

                                        />
                                    </div>

                                    <div class="col">
                                        <label for="pnumber"> Phone number</label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            readOnly
                                            placeholder="Enter phone number"
                                            id="Mobile"
                                            name="Mobile"

                                        />
                                    </div>


                                    <div class="col">
                                        <label for="email"> Email</label>

                                        <input
                                            type="Email"
                                            readOnly
                                            className="form-control"
                                            placeholder="Enter Email"
                                            id="email"
                                            name="email"

                                        />
                                    </div>
                                </div>



                                <h2 class="section-break"></h2>

                                <div class="row">
                                    <h3>Select Table :</h3>

                                    <div class="col">

                                        <label for="Table">Table (select one):</label>
                                        <select
                                            class="form-select"
                                            id="table"
                                            name="table"


                                        >
                                            <option>Select Table</option>
                                            <option>1</option>
                                            <option>2</option>

                                        </select>
                                    </div>

                                    <div class="col">

                                        <label for="Table">Date (select one):</label>
                                        <select
                                            class="form-select"
                                            id="date"
                                            name="date"
                                        >
                                            <option>Select date</option>
                                            <option>1</option>
                                            <option>2</option>

                                        </select>
                                    </div>



                                </div>



                                <div class="row">


                                    <div class="col">

                                        <label for="Table">Time (select one):</label>
                                        <select
                                            class="form-select"
                                            id="time"
                                            name="time"
                                        >
                                            <option>Select time</option>
                                            <option>1</option>
                                            <option>2</option>

                                        </select>
                                    </div>

                                    <div class="col">

                                        <label for="person">person:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter person"
                                            id="person"
                                            name="person"

                                        />
                                    </div>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>



            </div>
        </>);

}


export default Table;
