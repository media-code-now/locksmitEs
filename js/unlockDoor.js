const unlockMyDiv = document.querySelector(".unlock-my-door-div");
const unlockMyDivBtn = document.querySelector(".unlock-btn");
const whereAreYouDiv = document.querySelector(".where-are-you-div");
const enableLoc = document.querySelector("#enable-location");
const mapWrap = document.querySelector(".map-wrap");
const littleFarDiv = document.querySelector(".you-seem-little-far-div");
const oneMoreStepDiv = document.querySelector('.one-more-step-div');
const locksmithDiv = document.querySelector('.nearest-locksmith-div');
const allSetDiv = document.querySelector('.all-set-div');
const thanksDiv = document.querySelector('.thanks-div');
const confirmBtn = document.querySelector("#confirm-btn");
var lat, long;
unlockMyDivBtn.addEventListener("click", () => {
  unlockMyDiv.style.display = "none";
  whereAreYouDiv.style.display = "flex";
});

function showPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMap, showError);
  } else {
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }
}

function showMap(position) {
  // Get location data
  lat = position.coords.latitude;
  long = position.coords.longitude;
  var square = new google.maps.Polygon({
    paths: [
      new google.maps.LatLng(35.624222, -80.896976),
      new google.maps.LatLng(35.539351, -81.044997),
      new google.maps.LatLng(35.221923, -81.244811),
      new google.maps.LatLng(35.017204, -81.249617),
      new google.maps.LatLng(34.911555, -81.116408),
      new google.maps.LatLng(34.895224, -80.992125),
      new google.maps.LatLng(34.976283, -80.625456),
      new google.maps.LatLng(35.11682, -80.537566),
      new google.maps.LatLng(35.395487, -80.477828),
      new google.maps.LatLng(35.536976, -80.52246),
      new google.maps.LatLng(35.547591, -80.700987),
      new google.maps.LatLng(35.617368, -80.739769),
    ],
  });

  var latlong = new google.maps.LatLng(lat, long);

  var myOptions = {
    center: latlong,
    zoom: 16,
    mapTypeControl: true,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL,
    },
  };

  var map = new google.maps.Map(document.getElementById("embedMap"), myOptions);
  square.setMap(map);
  var marker = new google.maps.Marker({
    position: latlong,
    map: map,
    title: "You are here!",
  });
  var inOrOut = google.maps.geometry.poly.containsLocation(
    marker.getPosition(),
    square
  );

  confirmBtn.addEventListener("click", () => {
    mapWrap.style.display = "none";
    if (inOrOut) {
      oneMoreStepDiv.style.display = "block";
    } else {
      littleFarDiv.style.display = "block";
    }
  });
}

// Define callback function for failed attempt
function showError(error) {
  if (error.code == 1) {
    result.innerHTML =
      "You've decided not to share your position, but it's OK. We won't ask you again.";
  } else if (error.code == 2) {
    result.innerHTML =
      "The network is down or the positioning service can't be reached.";
  } else if (error.code == 3) {
    result.innerHTML =
      "The attempt timed out before it could get the location data.";
  } else {
    result.innerHTML = "Geolocation failed due to unknown error.";
  }
}

enableLoc.addEventListener("click", () => {
  showPosition();
  whereAreYouDiv.style.display = "none";
  mapWrap.style.display = "block";
});

function handleContactoForm() {
  const inputName = document.querySelector('#unlock-mobile-form-name').value;
  const inputPhone = document.querySelector('#unlock-mobile-form-tel').value;
  const serviceOption = document.querySelector('#service-option').value;

  
  fetch("https://send-smss.herokuapp.com/sms", {
      method: "POST",
      body: JSON.stringify({
          name: inputName,
          Contacto: inputPhone,
          latitude: lat,
          longitude: long,
          receiverNumber: "+17045089300",
          service: serviceOption

      }),
      credentials: 'include',
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      }
  })
  .then((resp) => {
      if(resp.status ==200) 
        alert("form submitted"); 
      else {
          throw Error ("something gone wrong")}
        })
    .catch (error => {
        console.log(error); 
        alert("something gone wrong")
        })
}