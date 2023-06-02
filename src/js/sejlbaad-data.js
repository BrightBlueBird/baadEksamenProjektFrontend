console.log("SejlbaadData");

const sejlBaadNavn  = document.getElementById("sejlbaadNavn");
const baadtype = document.getElementById("baadtypedropdown");
let baadTypeListe = [];



function getBaadType() {
    let dropDown = document.getElementById("baadtypedropdown");

    api('baadtype', 'GET').then(response => {
        baadTypeListe = response
        for (let i = 0; i < response.length; i++) {
            let dropdownoption = document.createElement("option");
            let baadtype = response[i];
            dropdownoption.text = baadtype.baadType;
            dropdownoption.value = baadtype.id
            dropDown.appendChild(dropdownoption);
        }
        console.log(baadTypeListe.length);

        getSejlbaad();
    });
}

function getSejlbaad() {

    api('sejlbaad', 'GET').then(response => {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            let baad = response[i];
            let baadId = baad.id;
            let baadNavn = baad.navn;
            let baadStorelse = baad.bådtypeid;


            let table = document.getElementById("sejlbaadTable");
            let row = table.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);

            let inputNavn = document.createElement("input");
            inputNavn.type = "text";
            inputNavn.value = baadNavn;
            inputNavn.disabled = true;
            cell1.appendChild(inputNavn);



            let selectType = document.createElement("select");
            selectType.disabled = true;

            console.log(baadTypeListe.length);
            for (let j = 0; j < baadTypeListe.length; j++) {
                console.log("hej");
                let option2 = document.createElement("option");
                let baadtype = baadTypeListe[j];
                console.log(baadtype.baadType);
                option2.text = baadtype.baadType;
                option2.value = baadtype.id;

                /*
                if(baadtype[j].id === baadStorelse.id){
                    option.selected = true;
                }

                 */
                selectType.appendChild(option2);
            }

            cell2.appendChild(selectType);



            let editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.setAttribute("class", "btn btn-primary");
            editButton.addEventListener("click", function () {
                inputNavn.disabled = false;
                selectType.disabled = false;
            });
            cell2.appendChild(editButton);

            let saveButton = document.createElement("button");
            saveButton.innerHTML = "Save";
            saveButton.setAttribute("class", "btn btn-danger");
            saveButton.addEventListener("click", function () {

                let rettetBaadNavn = inputNavn.value;
                let rettetBaadType = selectType.value;

                updateSejlbaad(baadId, rettetBaadNavn, rettetBaadType);
            });
            cell2.appendChild(saveButton);

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.setAttribute("class", "btn btn-danger");
            deleteButton.addEventListener("click", function () {
               deleteSejlbaad(baadId);
            });
            cell2.appendChild(deleteButton);
}
    });
}

function updateSejlbaad(baadId, modifiedBaadNavn, modifiedBaadPoint, modifiedBaadType) {
    let baadBody = { "id": baadId, "navn": modifiedBaadNavn, "bådtypeid": {"id" : modifiedBaadType}};

    api('api/put/retsejlbaad', 'PUT', baadBody).then(response => {
        console.log(response);
    });
}

function deleteSejlbaad(baadId) {
    let baadBody = {baadId};
    api('sletsejlbaad', 'DELETE', baadBody).then(response => {
        console.log(response);
    });
}

function opretNyBaad() {

    let baadBody = { "navn": sejlBaadNavn.value, "bådtypeid": {"id" : baadtype.value}};

    console.log(baadBody)
    api('api/post/sejlbaad', 'POST', baadBody).then(response => {
        console.log(response);
    });
}





