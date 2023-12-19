
// Variables
const csvname = 'HepatitisCdata.csv';

const cdr = {
    ID: 1000,
    AGE: 1200,
    SEX: 1400,
    ALB: 80000,
    ALP: 16000,
    ALT: 2300000,
    AST: 2000000,
    BIL: 800000,
    CHE: 375000,
    CREA: 14000,
    GGT: 1000,
    PROT: 700000,
}

// Funcion Get
async function getData(n) {
    let  table = document.getElementById("myTable");
    table.innerHTML = ""; // In case press again table

    const response = await fetch(csvname);
    const data = await response.text();
    const rows  = data.split(/\n/); // or ('\n')

    rows.forEach ( row => {
        const col = row.split(',');

        let htmlrow = table.insertRow();

        for (const [i, el] of col.entries()) {
            let cell = htmlrow.insertCell();
            if(n == 0)
                cell.innerHTML = el;
           
          } 
    })
    //console.log(table);
    $('#employee_table').html(table);
    $('table tr:first').css('font-weight','bold');
}
/*
<!-- Usar -->
*/

// col.forEach(el => {
