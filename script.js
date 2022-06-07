document.addEventListener("DOMContentLoaded", async () => {
    await load_data(); 
});

function load_data(){
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = "";
    const cards = JSON.parse(localStorage.getItem('cards'));
    var counter = -1;
    cards.forEach(card => {
        counter = counter + 1;
        contentElement.innerHTML += `  
                                        <div id='${card.name}_regularCard' class="cards">
                                            Name : ${card.name} <br>
                                            Age : ${card.age} <br>
                                            <button onclick="editFormVisible('${card.name}')">Modifier</button>
                                            <button onclick="delete_card('${counter}')">Supprimer</button>
                                        </div>
                                        <div id='${card.name}_editionCard' style="background-color:lightblue; margin:10px; display:none;">
                                            <input type="text" id="${card.name}_name_edit" value="${card.name}">
                                            <input type="number" id="${card.name}_age_edit" value="${card.age}">
                                            <button onclick="editFormHidden('${card.name}')">Retour</button>
                                            <button onclick="edit_card('${card.name}','${counter}')">Modifier</button>
                                        </div>
                                    </div>`
    });

}


function add_card(){
    const name = document.getElementById("name_input").value;
    const age = document.getElementById("age_input").value;
    const first_card = [{
        "name" : name,
        "age" : age
    }];
    const new_card = {
        "name" : name,
        "age" : age
    }; 
    if(!localStorage.getItem('cards')){
        localStorage.setItem('cards',JSON.stringify(first_card));
    }
    else{
        let cards = JSON.parse(localStorage.getItem('cards'));
        var already_exist = false;
        cards.forEach(card =>{
            if(card.name == new_card['name']){
                already_exist = true;
            }
        });
        if(already_exist){
            document.getElementById("alerte_doublon").style.display = "table";
        }
        else{
            document.getElementById("alerte_doublon").style.display = "none";
            cards.push(new_card);
            localStorage.setItem('cards',JSON.stringify(cards));
        }
    }
    load_data();
}

function delete_card(id){
    cards = JSON.parse(localStorage.getItem('cards'));
    cards.splice(id,1);
    localStorage.setItem('cards',JSON.stringify(cards));
    load_data();
}

function edit_card(name, id){
    const nameInput = name + "_name_edit";
    const ageInput = name + "_age_edit";
    const name_edit = document.getElementById(nameInput).value;
    const age_edit = document.getElementById(ageInput).value;
    card_edited = {
        "name" : name_edit,
        "age" : age_edit
    }
    let cards = JSON.parse(localStorage.getItem('cards'));
    var already_exist = false;
    cards.forEach(card =>{
        if(card.name == card_edited['name'] && card.name != name){
            already_exist = true;
        }
    });
    if(already_exist){
        document.getElementById("alerte_doublon_edit").style.display = "table";
    }
    else{
        document.getElementById("alerte_doublon_edit").style.display = "none";
        cards.splice(id,1,card_edited);
        localStorage.setItem('cards',JSON.stringify(cards));
        load_data();
    }
}

function editFormVisible(cardName){
    document.getElementById(`${cardName}_editionCard`).style.display = "table";
    document.getElementById(`${cardName}_regularCard`).style.display = "none";
}

function editFormHidden(cardName){
    document.getElementById(`${cardName}_editionCard`).style.display = "none";
    document.getElementById(`${cardName}_regularCard`).style.display = "table";
}


//Prise de photos 
capturer = ImageCapture(streamVideoTrack);
capturer.takePhoto();
capturer.setOptions(photoSettings);

function getUserMedia(options, successCallback, failureCallback) {
  var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

var theStream;

function getStream() {
  if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
    alert('User Media API not supported.');
    return;
  }
  
  var constraints = {
    video: true
  };

  getUserMedia(constraints, function (stream) {
    var mediaControl = document.querySelector('video');
    if ('srcObject' in mediaControl) {
      mediaControl.srcObject = stream;
    } else if (navigator.mozGetUserMedia) {
      mediaControl.mozSrcObject = stream;
    } else {
      mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
    }
    theStream = stream;
  }, function (err) {
    alert('Error: ' + err);
  });
}

function takePhoto() {
  if (!('ImageCapture' in window)) {
    alert('ImageCapture is not available');
    return;
  }
  
  if (!theStream) {
    alert('Grab the video stream first!');
    return;
  }
  
  var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

  theImageCapturer.takePhoto()
    .then(blob => {
      var theImageTag = document.getElementById("imageTag");
      theImageTag.src = URL.createObjectURL(blob);
    })
    .catch(err => alert('Error: ' + err));
}

//AFFICHAGE DE LA MEMOIRE
document.getElementById('result').innerHTML = navigator.deviceMemory || 'unknown'

