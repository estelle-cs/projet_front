document.addEventListener("DOMContentLoaded", async () => {
  await load_data(); 
  //AFFICHAGE DE LA MEMOIRE TOUTES LES 10s
  load_memory();

});

function load_memory(){
  document.getElementById('result').innerHTML = navigator.deviceMemory || 'unknown'
  setTimeout(load_memory,10000);
}

function load_data(){
  const contentElement = document.getElementById("content");
  contentElement.innerHTML = "";
  let cards = JSON.parse(localStorage.getItem('cards'));
  counter = -1;
  cards.forEach(card => {
  counter = counter + 1;
    contentElement.innerHTML += `  <div class="content_card">
                                            <div id='${card.name}_regularCard' class="card">
                                                <img class="img_card" src="${card.img}">
                                                <div class="description_card">
                                                  <div class="label_infos_card">Nom : <br><span class="infos_card"> ${card.name}</span><br></div>
                                                  <div class="label_infos_card">Nombre de saisons : <br><span class="infos_card"> ${card.seasons}</span><br></div>
                                                  <div class="label_infos_card">Plateforme : <br><span class="infos_card"> ${card.plateform}</span><br></div>
                                                  <div class="label_infos_card">Note : <br><span class="infos_card"> ${card.note}/5</span><br></div>
                                                </div>
                                            </div>
                                            
                                            <div class="svg_line" id='${card.name}_svgLine' style="display:block">
                                                <svg class="single_svg" onclick="editFormVisible('${card.name}')" fill="#002459" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"/></svg>
                                                <svg class="single_svg" onclick="delete_card('${counter}')" fill="#FF0000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>
                                            </div>
                                        
                                            <div class="card_edit" id='${card.name}_editionCard' style="display:none;">
                                                <img class="img_card" src="${card.img}" alt="Netflix">
                                                <div class="description_card">
                                                    Nom : <br><input class="input_edit_form" type="text" id="${card.name}_name_edit" value="${card.name}"><br>
                                                    Nombre de saisons : <br><input class="input_edit_form" type="number" min="1" id="${card.name}_seasons_edit" value="${card.seasons}"><br>
                                                    Plateforme : <br> <select class="input_edit_form" id="${card.name}_plateform_edit" value="${card.plateform}"><br>
                                                                        <option value="${card.plateform}" selected disabled hidden>${card.plateform}</option>
                                                                        <option value="Netflix">Netflix</option>
                                                                        <option value="Disney+">Disney+</option>
                                                                        <option value="OCS">OCS</option>
                                                                        <option value="Canal+">Canal+</option>
                                                                        <option value="AmazonPrimeVideo">AmazonPrimeVideo</option>
                                                                      </select><br>
                                                    Note : <br><input class="input_edit_form" type="number" min="1" max="5" id="${card.name}_note_edit" value="${card.note}"/><br>
                                                </div>
                                            </div>
                                            <div class="svg_line" id='${card.name}_svgLine2' style="display:none;padding-top:6px">
                                                <svg class="single_svg" onclick="editFormHidden('${card.name}')" width="25px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M189.3,128.4L89,233.4c-6,5.8-9,13.7-9,22.4c0,8.7,3,16.5,9,22.4l100.3,105.4c11.9,12.5,31.3,12.5,43.2,0  c11.9-12.5,11.9-32.7,0-45.2L184.4,288h217c16.9,0,30.6-14.3,30.6-32c0-17.7-13.7-32-30.6-32h-217l48.2-50.4  c11.9-12.5,11.9-32.7,0-45.2C220.6,115.9,201.3,115.9,189.3,128.4z"/></svg>
                                                <svg class="single_svg" onclick="edit_card('${card.name}','${counter}')" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css"> .st0{fill:#41AD49;}</style><g><polygon class="st0" points="434.8,49 174.2,309.7 76.8,212.3 0,289.2 174.1,463.3 196.6,440.9 196.6,440.9 511.7,125.8 434.8,49     "/></g></svg>
                                                <svg class="single_svg" onclick="delete_card('${counter}')" fill="#FF0000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>
                                            </div>
                                        </div>`
  });

}


function add_card(){
  const name = document.getElementById("name_input").value;
  const seasons = document.getElementById("seasons_input").value;
  const plateform = document.getElementById("plateform_input").value;
  const note = document.getElementById("note_input").value;
  const img = "img/" + plateform + ".jpg";
  const first_card = [{
    "name" : name,
    "seasons" : seasons,
    "plateform" : plateform,
    "note" : note,
    "img" : img
  }];
  const new_card = {
    "name" : name,
    "seasons" : seasons,
    "plateform" : plateform,
    "note" : note,
    "img" : img
  }; 
  if(name == "" || seasons == "" || note == ""){
    document.getElementById("alerte_miss").style.display = "block";
  }
  else{
    document.getElementById("alerte_miss").style.display = "none";
    if(!localStorage.getItem('cards')){
      localStorage.setItem('cards',JSON.stringify(first_card));
    }
    else{
      let cards = JSON.parse(localStorage.getItem('cards'));
      let already_exist = false;
      cards.forEach(card =>{
        if(card.name == new_card['name']){
          already_exist = true;
        }
      });
      if(already_exist){
        document.getElementById("alerte_doublon").style.display = "block";
      }
      else{
        document.getElementById("alerte_doublon").style.display = "none";
        cards.push(new_card);
        localStorage.setItem('cards',JSON.stringify(cards));
      }
    }
    load_data();

  }

}

function delete_card(id){
  cards = JSON.parse(localStorage.getItem('cards'));
  cards.splice(id,1);
  localStorage.setItem('cards',JSON.stringify(cards));
  load_data();
}

function edit_card(name, id){
  const name_edit = document.getElementById(`${name}_name_edit`).value;
  const seasons_edit = document.getElementById(`${name}_seasons_edit`).value;
  const plateform_edit = document.getElementById(`${name}_plateform_edit`).value;
  const note_edit = document.getElementById(`${name}_note_edit`).value;
  const img = "img/" + plateform_edit + ".jpg";
  card_edited = {
    "name" : name_edit,
    "seasons" : seasons_edit,
    "plateform" : plateform_edit,
    "note" : note_edit,
    "img" : img
  }
  if(name_edit == "" || seasons_edit == "" || note_edit == ""){
    document.getElementById("alerte_miss_edit").style.display = "block";
  }
  else{
    let cards = JSON.parse(localStorage.getItem('cards'));
    let already_exist = false;
    cards.forEach(card =>{
      if(card.name == card_edited['name'] && card.name != name){
        already_exist = true;
      }
    });
    if(already_exist){
      document.getElementById("alerte_doublon_edit").style.display = "block";
    }
    else{
      document.getElementById("alerte_doublon_edit").style.display = "none";
      cards.splice(id,1,card_edited);
      localStorage.setItem('cards',JSON.stringify(cards));
      load_data();
    }
  }
}

function editFormVisible(cardName){
  document.getElementById(`${cardName}_editionCard`).style.display = "block";
  document.getElementById(`${cardName}_regularCard`).style.display = "none";
  document.getElementById(`${cardName}_svgLine`).style.display = "none";
  document.getElementById(`${cardName}_svgLine2`).style.display = "block";
}

function editFormHidden(cardName){
  document.getElementById(`${cardName}_editionCard`).style.display = "none";
  document.getElementById(`${cardName}_regularCard`).style.display = "block";
  document.getElementById(`${cardName}_svgLine`).style.display = "block";
  document.getElementById(`${cardName}_svgLine2`).style.display = "none";
}


//Prise de photos 
capturer = ImageCapture(streamVideoTrack);
capturer.takePhoto();
capturer.setOptions(photoSettings);

function getUserMedia(options, successCallback, failureCallback) {
  let api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
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
    let mediaControl = document.querySelector('video');
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
      const theImageTag = document.getElementById("imageTag");
      theImageTag.src = URL.createObjectURL(blob);
    })
    .catch(err => alert('Error: ' + err));
}



