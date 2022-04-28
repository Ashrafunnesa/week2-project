const form = document.getElementById('form');
const lsOutput = document.getElementById('output-value')
form.addEventListener('submit', function(event){
    event.preventDefault();
    const description = document.getElementById('description-value').value;
    const severity = document.getElementById('severity-value').value;
    const assigned = document.getElementById('assigned-value').value;
    const output =document.getElementById('message');
    // const lsOutput = document.getElementById('output-value')

    // console.log(description);
    // console.log(severity);
    // console.log(assigned);

    const lsKey = [description, severity, assigned];
    // console.log(lsKey[0], lsKey[1], lsKey[2]);

    const issue = JSON.stringify(lsKey);

    //  console.log(issue);

    if(description && assigned || severity){
        const id = Math.floor(Math.random() * 10);
        localStorage.setItem("id", issue);
        showList();
        // const db = localStorage.getItem("1");
        // console.log(db);
    }



    // for(let i =0; i < localStorage.length; i++ ){
    //     const key = localStorage.key(i);
    //     const value =localStorage.getItem(key);
    //     console.log(value);

    //     lsOutput.innerHTML = `${value}<br/>`;
    // }

    
});

function showList(){
    console.log(localStorage);
    console.log(localStorage.length);
    for(let i =0; i < localStorage.length; i++ ){
        const key = localStorage.key(i);

        // console.log(key);
        const value =localStorage.getItem(key);
        // console.log(value);
        const showIssue = JSON.parse(value)

        lsOutput.innerHTML += `${showIssue[0]}<br>${showIssue[1]}<br>${showIssue[2]}<br>`;
    }
}


// console.log(localStorage);
// function varifyPin(event){
//     event.preventDefault();
//     const description = document.getElementById('description-value').value;
//     const severity = document.getElementById('severity-value').value;
//     const assigned = document.getElementById('assigned-value').value;

//     console.log(description);
//     console.log(severity);
//     console.log(assigned);
// }