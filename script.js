function load_data(){
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = "";
    const cards = JSON.parse("[" + localStorage.getItem('cards') + "]");
    cards.forEach(card => {
        contentElement.innerHTML += `<div id='${card.name}' style="background-color:lightblue; margin:10px">
                                        Name : ${card.name}
                                        Age : ${card.age}
                                        <button onclick="delete_card('${card.name}')">Supprimer</button>
                                    </div>`
    });

}


function add_card(){
    const name = document.getElementById("name_input").value;
    const age = document.getElementById("age_input").value;
    const new_card = {
        "name" : name,
        "age" : age
    };
    if(!localStorage.getItem('cards')){
        localStorage.setItem('cards',JSON.stringify(new_card));
    }
    else{
        //card_to_add = localStorage.getItem('cards') + "," + JSON.stringify(new_card);
        let tab = JSON.parse(localStorage.getItem('cards'));
        //tab.add(new_card);
        console.log(typeof(tab));
        localStorage.setItem('cards', JSON.stringify(new_card));
    }
    load_data();
}

function delete_card(card_name){
    const cards = JSON.parse("[" + localStorage.getItem('cards') + "]");
    cards.forEach(card => {
        if(card['name'] == card_name){
            
        }
    });
    load_data();
}

