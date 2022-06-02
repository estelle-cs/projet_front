function load_data(){
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = "";
    const cards = JSON.parse(localStorage.getItem('cards'));
    var counter = -1;
    cards.forEach(card => {
        counter = counter + 1;
        contentElement.innerHTML += `<div id='${card.name}_regularCard' style="background-color:lightblue; margin:10px; display:table;">
                                        Name : ${card.name}
                                        Age : ${card.age}
                                        <button onclick="editFormVisible('${card.name}')">Modifier</button>
                                        <button onclick="delete_card('${counter}')">Supprimer</button>
                                    </div>
                                    <div id='${card.name}_editionCard' style="background-color:lightblue; margin:10px; display:none;">
                                        <input type="text" id="name_edit" value="${card.name}">
                                        <input type="number" id="age_edit" value="${card.age}">
                                        <button onclick="editFormHidden('${card.name}')">Retour</button>
                                        <button onclick="edit_card('${card.name}','${counter}')">Modifier</button>
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
        cards.push(new_card);
        localStorage.setItem('cards',JSON.stringify(cards));
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
    const name_edit = document.getElementById("name_edit").value;
    const age_edit = document.getElementById("age_edit").value;
    card_edited = {
        "name" : name_edit,
        "age" : age_edit
    }
    cards = JSON.parse(localStorage.getItem('cards'));
    cards.splice(id,1,card_edited);
    localStorage.setItem('cards',JSON.stringify(cards));
    load_data();
}


function editFormVisible(cardName){
    document.getElementById(`${cardName}_editionCard`).style.display = "table";
    document.getElementById(`${cardName}_regularCard`).style.display = "none";
}

function editFormHidden(cardName){
    document.getElementById(`${cardName}_editionCard`).style.display = "none";
    document.getElementById(`${cardName}_regularCard`).style.display = "table";
}
