const terminology = document.querySelector(".terminology"),
      definition = document.querySelector(".definition"),
      saveBtn = document.querySelector(".btn"),
      saveContainer = document.querySelector(".save_container")
      span = document.querySelector(".span");

let terminologies;
let btnDelete;

localStorage.length < 1 ? terminologies = [] : terminologies = JSON.parse(localStorage.getItem("terminologies"));

const toggle = () => {
    if (terminologies.length > 0){
        span.classList.add("deactive");
    }else{
        span.classList.remove("deactive");
    }
}

const upperCase = () => {

}

const addDelete = () => {
    if (terminologies.length > 0){
        btnDelete = document.querySelectorAll(".btn_delete");
        for (btn of btnDelete){
            btn.addEventListener("click", e => {
                deleteTerminology(e);
                toggle()
            })
        }
    }
}

const addTermsToContainer = index => {
    saveContainer.innerHTML += `
        <div class="collection">
            <div class="collection_name">
                <h2>${terminologies[index].terminology}</h2>
                <button class="btn_delete">X</button>
            </div>
                <p class="text_description">${terminologies[index].definition}</p>
        </div> 
    `
    addDelete();
    toggle()
}

terminologies.forEach((element, i) => {
    addTermsToContainer(i)
});

saveBtn.addEventListener("click", e => {
    e.preventDefault()
    terminologies.push(new TermsAndDefins(terminology.value, definition.value));
    localStorage.setItem("terminologies", JSON.stringify(terminologies));
    // localStorage.clear();

    addTermsToContainer(terminologies.length - 1);
    terminology.value = null;
    definition.value = null;
})

function TermsAndDefins (terminology, definition){
    this.terminology = terminology;
    this.definition = definition;
}

const deleteTerminology = e => {
    const targetIndex = e.target.parentNode.parentNode;
    e.target.parentNode.parentNode.remove();
    terminologies.splice(targetIndex, 1);
    localStorage.removeItem("terminologies");
    localStorage.setItem("terminologies", JSON.stringify(terminologies));
}

addDelete();