import React, { useEffect } from "react";
import Header from "./Header";

function Index() {
  useEffect(() => {
    let menu = document.querySelector("#menu-button");
    let navbar = document.querySelector(".navbar");

    menu.onclick = () => {
      menu.classList.toggle("fa-times");
      navbar.classList.toggle("active");
    };

    window.onscroll = () => {
      menu.classList.remove("fa-times");
      navbar.classList.remove("active");
    };
  }, []);

  return (
    <>
      {/* header section start from here */}
      <Header />
      {/* header section end here */}

      {/* banner section start here */}

      <div class="banner">
        <div class="banner-overlay"></div>
        <div class="banner-content">
          <h3>EatToast Restaurant Management System</h3>
          <p>
            A restaurant is a culinary establishment where prepared food and
            beverages are served to customers. It is a space where people gather
            to enjoy a variety of dishes, often created by skilled chefs.
            Restaurants come in diverse styles and cuisines, ranging from casual
            eateries to fine dining establishments. They play a crucial role in
            social and cultural experiences, offering a space for celebrations,
            meetings, and shared moments.
          </p>
          <a href="/Menu" class="main-button">
            Order Now
          </a>
        </div>
      </div>

      {/* banner section end here */}

      {/* speciality section start here */}
      <div class="special" id="special">
        <h1 class="special-head text-center">
          {" "}
          Our <span>Speciality Menu</span>
        </h1>

        <div class="special-box-container">
          <div class="box">
            <img
              src="/img/pancake.jpg"
              alt="Speciality 1"
              class="special-image"
            />

            <div class="content">
              <div class="fas fa-pizza-slice content-icon"></div>
              <h3>Decadent Chocolate Cake</h3>
              <p>
                Indulge in layers of rich chocolate cake, topped with creamy
                chocolate frosting and chocolate shavings.
              </p>
            </div>
          </div>

          <div class="box">
            <img
              src="/img/chocolate.jpg"
              alt="Speciality 1"
              class="special-image"
            />

            <div class="content">
              <div class="fas fa-glass-whiskey content-icon"></div>
              <h3>Classic Club Sandwich</h3>
              <p>
                Savor the flavors of turkey, bacon, lettuce, tomato, and
                mayonnaise layered between toasted bread slices.
              </p>
            </div>
          </div>

          <div class="box">
            <img
              src="/img/Blueberry.jpg"
              alt="Speciality 1"
              class="special-image"
            />

            <div class="content">
              <div class="fas fa-mug-hot content-icon"></div>
              <h3>Breakfast wrap</h3>
              <p>
                The "burger" is derived from the resemblance of the icon to the
                layers in a hamburger.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* speciality section end here */}

      {/* about section start here */}

      <div class="about">
        <div class="about_main">
          <div class="about_image">
            <img src="/img/about.png" />
          </div>

          <div class="about_text">
            <h1>
              <span>About</span>Us
            </h1>
            <h3>Why food choose us?</h3>
            <p>
              At EatToast, we believe that food isn't just about sustenance –
              it's about creating moments to savor and memories to cherish.
              Here's why discerning diners choose us: Exceptional Quality: We
              source the freshest ingredients from local producers and artisans,
              ensuring that every dish is bursting with flavor and quality.
              Creative Cuisine: Our talented chefs infuse every dish with
              innovation and creativity, resulting in a menu that surprises and
              delights with each bite. Community Focus: We're more than just a
              restaurant – we're a gathering place for friends, families, and
              food lovers alike. Our welcoming atmosphere and attentive service
              make every meal feel like a special occasion.
            </p>

            <div class="about_services">
              <div class="s_1">
                <a href="#">Fast Delivery</a>
              </div>

              <div class="s_1">
                <a href="#">Easy Payment</a>
              </div>

              <div class="s_1">
                <a href="#">24 x 7 Services</a>
              </div>
            </div>

            <a href="/Menu" class="about_btn">
              <i class="fa-solid fa-burger"></i>Order Now
            </a>
          </div>
        </div>
      </div>

      {/* about section end here */}

      <div class="team">
        <h1 class="special-head text-center">
          {" "}
          Our <span>Speciality Team</span>
        </h1>

        <div class="team_line_1"></div>

        <div class="team_box">
          <div class="team_card">
            <div class="team_img">
              <img src="/img/team_1.jpg" />
            </div>

            <div class="team_tag">
              <h2>John Deo</h2>
              <p class="job">Cook</p>
              <p class="info">
                John Deo brings a wealth of culinary expertise to our kitchen.
                With years of experience in the culinary industry, John has
                honed his skills in kitchens around the world. His passion for
                food and dedication to his craft shine.
              </p>
            </div>
          </div>

          <div class="team_card">
            <div class="team_img">
              <img src="/img/team_2.jpg" />
            </div>

            <div class="team_tag">
              <h2>Mary Smith</h2>
              <p class="job">Sous Chef</p>
              <p class="info">
                Mary Smith is a vital member of our culinary team, bringing
                creativity and precision to every dish she prepares. With a
                background as a chef, Mary has developed a keen eye for detail
                and a flair for creating unforgettable culinary experiences.
              </p>
            </div>
          </div>

          <div class="team_card">
            <div class="team_img">
              <img src="/img/team_3.jpg" />
            </div>

            <div class="team_tag">
              <h2>David Johnson</h2>
              <p class="job">Chef de Partie</p>
              <p class="info">
                David Johnson is a skilled Chef de Partie with a passion for
                crafting exquisite dishes. Trained in making cusion, David
                brings a unique blend of creativity and technical expertise to
                our kitchen.
              </p>
            </div>
          </div>

          <div class="team_card">
            <div class="team_img">
              <img src="/img/team_4.jpg" />
            </div>

            <div class="team_tag">
              <h2>Emily Brown</h2>
              <p class="job">Pastry Chef</p>
              <p class="info">
                Emily Brown is our talented Pastry Chef, responsible for
                creating delectable desserts that leave our customers craving
                more. With a background in [mention any relevant culinary
                training or experiences], Emily has mastered the art of
                pastry-making and dessert design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
