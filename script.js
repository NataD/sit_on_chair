//code for toggling expansion of humburger
document.addEventListener('DOMContentLoaded', function(){

  //code to show modal when the navigation humburger is clicked
  var toggleModal = document.querySelector(".nav-hamburger");
  var toggleClose = toggleModal.children;
  var modal = document.querySelector('.modal');
  var body = document.querySelector('body');

  toggleModal.addEventListener('click', function(event){
    console.log("it works");

    if(modal.style.display == "block"){
      modal.style.display = "none";
      body.style.overflow = "scroll";
    } else {
      modal.style.display = "block";
      body.style.overflow = "hidden";
  }

  this.classList.toggle('change');
  });

  //code for hiding/showing dropdown menu
  var navigation = document.querySelectorAll('.nav-element');

  [...navigation].forEach(function(element){
  element.addEventListener('click', function(event){
    var dropdown = document.querySelector('.dropdown-menu');
    var menuOverlay = document.querySelector('.menu-overlay');
    var aboutOverlay = document.querySelector('.about-overlay');
    var icon = document.querySelector('.nav-element i');
    console.log(icon);
    //console.log(dropdown);

    //way to add dropdown in menu without adding css class
    if (dropdown.style.display !== "block") {
        dropdown.style.display = "block";
        menuOverlay.style.display = "block";
        aboutOverlay.style.display = "block";
        icon.style.transform = "rotate(180deg)";
    } else {
        dropdown.style.display = "none";
        menuOverlay.style.display = "none";
        aboutOverlay.style.display = "none";
        icon.style.transform = "rotate(360deg)";
    }
        aboutOverlay.addEventListener('click', function(event){
        aboutOverlay.style.display = "none";
        dropdown.style.display = "none";
        menuOverlay.style.display = "none";
        icon.style.transform = "rotate(360deg)";
    });

    //code to hide expanded menu on page scroll
    window.addEventListener('scroll', function (ev) {
          if (this.pageYOffset > 100){
              aboutOverlay.style.display = "none";
          }
      });
    });
  });

  //code for slider
  var previous = document.querySelector('.arrow-left');
  var next = document.querySelector('.arrow-right');
  var imageElements = document.querySelectorAll('.slider-image li');
  var sliderImages = document.querySelector('.slider-image');
  var counter = 0;

  imageElements[counter].classList.add('visible');
  previous.addEventListener('click', function (event) {

    [...imageElements].forEach(function(element){

        if (element.className === 'visible'){
            element.classList.remove('visible');
        }

    });
    counter -=1;

    if (counter < 0) {
        counter = imageElements.length-1;
    }

    imageElements[counter].classList.add('visible');
  });

  next.addEventListener('click', function (event) {

    [...imageElements].forEach(function(element){

            if (element.className === 'visible'){
               element.classList.remove('visible');
           }

    });
    counter +=1;

    if (counter >= imageElements.length) {
        counter = 0;
    }

    imageElements[counter].classList.add('visible');
  });

  //code for calculator
  var dropdownOptions = document.querySelectorAll('.drop_down_list');
  var arrow = document.querySelectorAll('.list_arrow');
  var leftSection = document.querySelector('.panel_left')
  var chairType = document.querySelector('.panel_left .title');
  var chairColor = document.querySelector('.panel_left .color');
  var chairMaterial = document.querySelector('.panel_left .pattern');
  var transportation = document.querySelector('.panel_left .transport');
  var rightSection = document.querySelector('.panel_right');
  var chairTypeCost = document.querySelector('.panel_right .title');
  var chairColorCost = document.querySelector('.panel_right .color');
  var chairMaterialCost = document.querySelector('.panel_right .pattern');
  var transportationCost = document.querySelector('.panel_right .transport');
  var options = document.querySelectorAll('.list_panel');
  var label = document.querySelectorAll('.list_label');
  var totalSum = document.querySelector('.sum strong');
  totalSum.innerText = 0;
  var transportCheckbox = document.querySelector('#transport');
  dropdownOptions.forEach(function(element){

  //show dropdown on click
  element.querySelector('.list_arrow').addEventListener('click', function(event){
    var options = this.parentElement.querySelector('.list_panel');

    if (options.style.display !== "block") {
      options.style.display = "block";
    } else {
      options.style.display = "none";
    }

    //change background while hovering over list items in drop_down_list
    var listOptions = options.querySelectorAll('li');

    [...listOptions].forEach(function(element){
      element.addEventListener('mouseover', function(event){
      element.style.color = "#27C7AB";
      });
    });

    [...listOptions].forEach(function(element){
      element.addEventListener('mouseout', function(event){
      element.style.color = "#585858";
      });
    });

    //select particular list element
    [...listOptions].forEach(function(element){
      element.addEventListener('click', function(event){
      options.parentElement.querySelector('.list_label').innerText = element.innerText;
      options.parentElement.querySelector('.list_label').style.color = 'black';
      options.style.display = 'none';

      //transfer all info from selected options to summary of the order
      if(element.parentElement.parentElement === dropdownOptions[0]){
        chairType.innerText = element.innerText;
        chairTypeCost.innerText = element.dataset.price;
      } else if (element.parentElement.parentElement === dropdownOptions[1]){
        chairColor.innerText = element.innerText;
        chairColorCost.innerText = element.dataset.price;
      } else if (element.parentElement.parentElement === dropdownOptions[2]){
        chairMaterial.innerText = element.innerText;
        chairMaterialCost.innerText = element.dataset.price;
      }

      function getNum(val){
        if(isNaN(val)){
          return 0;
        }
        return Number(val);
      }

      var totalPrice = rightSection.children;
      var typeCost = getNum(totalPrice[0].innerText);
      var colorCost =  getNum(totalPrice[1].innerText);
      var materialCost = getNum(totalPrice[2].innerText);
      var total = typeCost + colorCost + materialCost;

      totalSum.innerText = total + " EUR";

      });
    });
  }); //closing addEventListener on arrow
}); //closing dropdownOptions forEach

  transportCheckbox.addEventListener('change', function(event){
    if(transportCheckbox.checked){
      transportation.innerText = "Transportation";
      transportationCost.innerText = transportCheckbox.dataset.transportPrice;
      totalSum.innerText =  parseInt(totalSum.innerText) + parseInt(transportCheckbox.dataset.transportPrice) + " EUR";
    } else if (!transportCheckbox.checked){
      transportation.innerText = '';
      transportationCost.innerText = '';
      totalSum.innerText = parseInt(totalSum.innerText) - parseInt(transportCheckbox.dataset.transportPrice) + " EUR";
    }
  });

});//closing DOM
