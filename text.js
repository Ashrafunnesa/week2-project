const form = document.getElementById('form');
const lsOutput = document.getElementById('output-value');
const issueID = document.getElementById('issue-id');
const display_data = document.getElementById('display_data');
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

    const lsKey = [description, severity, assigned, Math.random() * 1000000 ];
    // console.log(lsKey[0], lsKey[1], lsKey[2]);

    const issue = JSON.stringify(lsKey);

     console.log(issue);

    if(description && assigned || severity){
        // const id = Math.floor(Math.random() * 10);
        // console.log(id);
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
    // console.log(localStorage);
    // console.log(localStorage.length);
    for(let i =0; i < localStorage.length; i++ ){
        const key = localStorage.key(i);

        console.log(key);
        const value =localStorage.getItem(key);
        console.log(value);
        const showIssue = JSON.parse(value);

        
        // lsOutput.innerHTML += `${showIssue[1]}<br>${showIssue[2]}<br>`;
        // issueID.innerHTML += `Issue id: ${showIssue[3]}`;
        // // display_data.innerHTML = 
        const displayDiv = document.createElement('div');
        displayDiv.setAttribute('class', 'wrapper-2');
        displayDiv.setAttribute('id', 'message');
        document.getElementById("display_data").appendChild(displayDiv);

        

        const para1 = document.createElement("p");
        para1.innerHTML = `Issue id: ${showIssue[3]}`;
        displayDiv.append(para1);

        const openBtn = document.createElement("button");
        openBtn.innerHTML = `open`;
        openBtn.setAttribute('class', 'open-button');
        displayDiv.append(openBtn);

        const high1 = document.createElement("h1");
        high1.innerHTML = `Test description`;
        displayDiv.append(high1);

        const paraIcon = document.createElement('div');
        paraIcon.setAttribute('class', 'para-icon');


        const para2 = document.createElement("p");
        para2.innerHTML = `${showIssue[1]}`;
        const icon2 = document.createElement('i')
        icon2.setAttribute('class' , 'far fa-clock');
        para2.prepend(icon2);
        //paraIcon.append(icon2);
        //paraIcon.append(para2);
        displayDiv.append(para2);

        const para3 = document.createElement("p");
        para3.innerHTML = `${showIssue[2]}`;
        const icon3 = document.createElement('i')
        icon3.setAttribute('class' , 'fas fa-user-alt');
        para3.prepend(icon3);
        displayDiv.append(para3);

        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = `Close`;
        closeBtn.setAttribute('class', 'close-button');
        displayDiv.append(closeBtn);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = `delete`;
        deleteBtn.setAttribute('class', 'delete-button');
        displayDiv.append(deleteBtn);
    }
}
function validateForm(){
    const form = document.getElementById('form');
    const desValue = form['des'].value;
    const assignValue = form['assign'].value;

    if(desValue == ''|| assignValue ==''){
        alert("This field is required");
        return false
    }
    

}
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});


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