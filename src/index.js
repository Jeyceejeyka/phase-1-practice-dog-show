document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/dogs";

  const dogForm = document.getElementById("dog-form");
  const nameInput = document.querySelector('input[name="name"]');
  const breedInput = document.querySelector('input[name="breed"]');
  const sexInput = document.querySelector('input[name="sex"]');
  const submitButton = document.querySelector('input[type="submit"]');
  const tableBody = document.getElementById("table-body");

  // Fetching dog data using fetch method
  const fetchDogs = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((dogs) => {
        console.log(dogs);
        renderDogTable(dogs);
      })
      .catch((error) => console.error("Error fetching dogs:", error));
  };

  // rendering dog data 
  const renderDogTable = (dogs) => {
    tableBody.textContent = ''; // make sure the table content is empty .
    
    dogs.forEach(el => {
      //creating tr for holding all the needed data from the dogs json.server. 
      const tr = document.createElement("tr");

      //creating name row which will display the name of the dog;
      const nameRow = document.createElement("td");
      nameRow.textContent = `${el.name}`

      //creating breed row which will display the name of the breed of that dog;
      const breedRow = document.createElement("td");
      breedRow.textContent = `${el.breed}`;

      //creating breed row which will display the name of the breed of that dog;
      const sexRow = document.createElement("td");
      sexRow.textContent = `${el.sex}`;

      //creating edit table description for holding the edit button;
      const editTd = document.createElement("td");
      //creating a button for edit dog data;
      const editBtn = document.createElement("button");
      editBtn.textContent = `Edit`;
      // appending edit btn to to its td.
      editTd.appendChild(editBtn);

      //adding all created data to the tr;
      tr.appendChild(nameRow);
      tr.appendChild(breedRow);
      tr.appendChild(sexRow);
      tr.appendChild(editTd);

      // adding tr element to the tableBody element
      tableBody.appendChild(tr);

      //adding event listener to the edit button 
      editBtn.addEventListener("click", () => {
        nameInput.value = el.name;
        breedInput.value = el.breed;
        sexInput.value = el.sex;
        submitButton.dataset.dogId = el.id;// storing the dog id in the submit btn for reference;
      });
    });
  }

  //handling the form submission 
  dogForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const dogId = submitButton.dataset.dogId;
    const updatedData = {
      name: nameInput.value,
      breed: breedInput.value,
      sex:sexInput.value,
    }

    if(dogId) {
      fetch(`${API_URL}/${dogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData)
      })
        .then(res => res.json())
        .then(() => {
          fetchDogs();
          dogForm.reset();
          delete submitButton.dataset.dogId;
        })
        .catch((error) => console.error("Error updating dog:", error));
    }

  });



  //fetch initial data
  fetchDogs()
});
