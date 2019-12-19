var mo;
var longitude=[];
var geo =[];
var arr = new Map();
var model=[];
var email_id;
var myMap;
var flkty;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    if(user != null){
      email_id = user.email;
      email_id = email_id.substring(0, email_id.indexOf("@"));
      console.log(email_id);
      email_id = email_id.replace(/\./g, '+')
      console.log(email_id);


      let k = new Promise(function (resolve,reject) {
        firebase.database().ref("USERS/"+email_id).once("value",function(snp){
          for (let goe in snp.val()) {
              model.push(goe);
            };
          resolve();
        });


      })
      k.then(function () {
        flkty = new Flickity( '.carousel', {
          initialIndex: 2
        });
        for(var i=0; i<model.length;i++){
            var cellElems = makeCell(i);
            flkty.append( cellElems );
            longitude.push(cellElems);
            console.log(flkty);
        }

          console.log("работает "+model);
          init();
      });


      }

  } else {

  }
});








function makeCell(i) {
  var cell = document.createElement('div');
  cell.className = 'col-sm-2';
  cell.innerHTML = `
          <div class="card mb-3" style="max-width: 200px;">
           <div class="row no-gutters">
             <div class="col-md-3">
               <img src="/image.jpg" class="card-img" alt="...">
             </div>
             <button onclick="sayThanks(this.innerText)" class="col-md-8 card-body model_button">
                `+model[i]+`
             </button>
           </div>
          </div>
`;
  return cell;
}

function sayThanks(a) {
  console.log("1 "+a);
  var m = a;
  console.log("2 "+a.innerText);
  geo= [];
  firebase.database().ref("DATA/"+email_id+"/"+m).on("value",function(snp){
    for (let goe in snp.val()) {
      geo.push(new Array(snp.val()[goe].latitude,snp.val()[goe].longitude))
      console.log(snp.val()[goe].latitude);
      console.log(snp.val()[goe].longitude);
    }
    arr.set(a,geo);
    console.log(geo);
    myMap.destroy();
    ymaps.ready(init1);
  });

}

function init() {
    myMap = new ymaps.Map('map', {
            center: [44.939950, 34.091361],
            zoom: 15,
            controls: []
        },{
        searchControlProvider: 'yandex#search'
    });
}

function logout(){
      flkty.remove(longitude[0]);
            flkty.remove(longitude[1]);
  longitude=[];
  model=[];
  myMap.destroy();
  firebase.auth().signOut();
}



function init1() {

    myMap = new ymaps.Map('map', {
            center: geo[geo.length-1],
            zoom: 15,
            controls: []
        }),
        button = new ymaps.control.Button({});
        // Создаем ломаные линии.
        var firstAnimatedLine = new ymaps.Polyline(geo, {}, {
            // Задаем цвет.
             balloonCloseButton: true,
            strokeColor: "#ED4543",
            // Задаем ширину линии.
            strokeWidth: 5,
        });
        var myGeoObject = new ymaps.Placemark(geo[geo.length-1], {
          balloonContent: 'я тут'
      }, {
          preset: 'islands#circleIcon',
          iconColor: '#3caa3c'
      });
        // Добавляем линии на карту.
        myMap.geoObjects
        .add(firstAnimatedLine)
        .add(myGeoObject);
}
