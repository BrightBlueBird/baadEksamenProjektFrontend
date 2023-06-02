
function createRaces(){

    api('hentRaes', 'GET').then(response => {

        console.log(response.length);
        if (response.length === 0) {

            const startDate = new Date('2023-05-01');
            const endDate = new Date('2023-10-31');


            for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                if (date.getDay() === 3) {
                    let raesBodySmaa = {"dato": date, "bådtypeid": {"id": 1}};

                    console.log(raesBodySmaa)
                    api('api/post/opretraes', 'POST', raesBodySmaa).then(response => {
                        console.log(response);
                    });

                    let raesBodyMlm = {"dato": date, "bådtypeid": {"id": 2}};

                    console.log(raesBodyMlm)
                    api('api/post/opretraes', 'POST', raesBodyMlm).then(response => {
                        console.log(response);
                    });

                    let raesBodyStor = {"dato": date, "bådtypeid": {"id": 3}};

                    console.log(raesBodyStor)
                    api('api/post/opretraes', 'POST', raesBodyStor).then(response => {
                        console.log(response);
                    });
                }
            }


        } else {
            const table = document.getElementById("raesTable");

            const dataTyper = ['id', 'dato', 'bådtypeid'];
            const dataTypeRække = table.insertRow();
            dataTyper.forEach(dataTxt => {
                const dataTypeCell = document.createElement('th');
                dataTypeCell.textContent = dataTxt;
                dataTypeRække.appendChild(dataTypeCell);
            });

            response.forEach(raes => {
                const række = table.insertRow();
                const raesIdCelle = række.insertCell();
                const datoCelle = række.insertCell();
                const bådtypeIdCelle = række.insertCell();

                raesIdCelle.textContent = raes.id;
                datoCelle.textContent = raes.dato;
                bådtypeIdCelle.textContent = raes.bådtypeid.id;

                dataTyper.forEach(dataTxt => {
                    const dataCell = document.createElement('td');
                    dataCell.textContent = raes[dataTxt];
                    række.appendChild(dataCell);
                });
            });
        }


});
}
