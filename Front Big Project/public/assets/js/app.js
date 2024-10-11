document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:4550/api/user")
    .then((response) => response.json())
    .then((data) => {
      const menuContainer = document.querySelector("#menu");

      
        // Create main container
        const container = document.createElement("div");
        container.className = "container mx-auto tm-container py-24 sm:py-48";

        // Create and append title section
        const titleSection = document.createElement("div");
        titleSection.className = "text-center mb-16";
        const title = document.createElement("h2");
        title.className ="bg-white tm-text-brown py-6 px-12 text-4xl font-medium inline-block rounded-md";
        title.textContent = "Our Cafe Menu";
        titleSection.appendChild(title);
        container.appendChild(titleSection);

        // Create and append menu items section
        const menuSection = document.createElement("div");
        menuSection.className ="flex flex-col lg:flex-row justify-around items-center";

        // Function to create menu item
        // const createMenuItem = (imgSrc,altText,itemName,priceSmall,priceLarge) => {
          const itemContainer = document.createElement("div");
          itemContainer.className ="flex-1 m-5 rounded-xl px-4 py-6 sm:px-8 sm:py-10 tm-bg-brown tm-item-container";
          
          
          data.forEach((item) => {
          const menuItem = document.createElement("div");
          menuItem.className = "flex items-start mb-6 tm-menu-item";

          menuItem.innerHTML = `
            <img src="${item.img}" alt="Image" class="rounded-md">
            <div class="ml-3 sm:ml-6">
                <h3 class="text-lg sm:text-xl mb-2 sm:mb-3 tm-text-yellow">${item.fullname}</h3>
                <div class="text-white text-md sm:text-lg font-light mb-1">
                    <p>Small $${item.priceSmall}</p>
                </div>
                <div class="text-white text-md sm:text-lg font-light">
                    <p>Large $${item.priceBig}</p>
                </div>
            </div>
          `  
          itemContainer.appendChild(menuItem);
        });

        


        menuSection.appendChild(itemContainer);
        container.appendChild(menuSection);

        menuContainer.appendChild(container);
      });
});
//   return itemContainer;
        // };

        // Add menu items
        // menuSection.appendChild(
        //   createMenuItem(
        //     "./assets/img/menu-item-1.jpg",
        //     "Hot Cappuccino",
        //     "Hot Cappuccino",
        //     "8.50",
        //     "10.50"
        //   )
        // );
        // Add more menu items as needed
        // menuSection.appendChild(createMenuItem('./assets/img/menu-item-2.jpg', 'Iced Latte', 'Iced Latte', '7.00', '9.00'));
//   const img = document.createElement("img");
        //   img.src = `${item.img}`;
        //   img.alt = "Image";
        //   img.className = "rounded-md";

        //   const details = document.createElement("div");
        //   details.className = "ml-3 sm:ml-6";

        //   const itemNameElem = document.createElement("h3");
        //   itemNameElem.className ="text-lg sm:text-xl mb-2 sm:mb-3 tm-text-yellow";
        //   itemNameElem.textContent = `${item.fullname}`;

        //   const priceSmallElem = document.createElement("div");
        //   priceSmallElem.className ="text-white text-md sm:text-lg font-light mb-1";
        //   priceSmallElem.textContent = `S $${item.priceSmall}`;

        //   const priceLargeElem = document.createElement("div");
        //   priceLargeElem.className = "text-white text-md sm:text-lg font-light";
        //   priceLargeElem.textContent = `L $${item.priceBig}`;
      // const menuContainer = document.querySelector('.parallax-window');

      // data.forEach((item) => {
      //   const itemCard = document.createElement("div");
      //   itemCard.innerHTML = `
      //     <img src="${item.img}" alt="">
      //     <h3>${item.fullname}</h3>
      //     <p>${item.priceSmall}</p>
      //     <p>${item.priceBig}</p>
      //     <a href="#">Buy <i class="fas fa-chevron-right"></i></a>

      //   `
      //   menuContainer.appendChild(itemCard)
      // });
            //   const details = document.createElement("div");
        //   details.className = "ml-3 sm:ml-6";
//   details.appendChild(itemNameElem);
        //   details.appendChild(priceSmallElem);
        //   details.appendChild(priceLargeElem);

        //   menuItem.appendChild(img);
        //   menuItem.appendChild(details);
function checkAndShowHideMenu() {
  if (window.innerWidth < 768) {
    $("#tm-nav ul").addClass("hidden");
  } else {
    $("#tm-nav ul").removeClass("hidden");
  }
}

$(function () {
  var tmNav = $("#tm-nav");
  tmNav.singlePageNav();

  checkAndShowHideMenu();
  window.addEventListener("resize", checkAndShowHideMenu);

  $("#menu-toggle").click(function () {
    $("#tm-nav ul").toggleClass("hidden");
  });

  $("#tm-nav ul li").click(function () {
    if (window.innerWidth < 768) {
      $("#tm-nav ul").addClass("hidden");
    }
  });

  $(document).scroll(function () {
    var distanceFromTop = $(document).scrollTop();

    if (distanceFromTop > 100) {
      tmNav.addClass("scroll");
    } else {
      tmNav.removeClass("scroll");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
