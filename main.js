let expense = document.querySelector("#exp");
let descrip = document.querySelector("#des");
let category = document.querySelector("#cat");
let addDetails = document.querySelector("#user-table");
let submit = document.querySelector(".btn");

//add data-------------------------------------------------------------------
submit.addEventListener("click", addExpenses);

//add data function
function addExpenses(e) {
  e.preventDefault(); 

  // create elements that have to append in the table body
  let row = document.createElement("tr");
  let expensecell = document.createElement("td");
  let descripcell = document.createElement("td");
  let categorycell = document.createElement("td");
  let deleteCell = document.createElement("td");
  let editCell = document.createElement("td");
  let del = document.createElement("button");
  let edit = document.createElement("button");

  del.textContent = "Delete";
  edit.textContent = "Edit";
  del.className = "del_edit";
  edit.className = "del_edit";

  expensecell.textContent = expense.value;
  descripcell.textContent = descrip.value;
  categorycell.textContent = category.value;
  deleteCell.appendChild(del);
  editCell.appendChild(edit);

  row.appendChild(expensecell);
  row.appendChild(descripcell);
  row.appendChild(categorycell);
  row.appendChild(deleteCell);
  row.appendChild(editCell);
  addDetails.appendChild(row); //Append into the table Body
  setData();

  //delete----------------------------------------------------------------
  del.addEventListener("click", deleteDetails);
  
  //delete function
  function deleteDetails() {
    row.remove();
    setData();
  }

  //edit--------------------------------------------------------------------
  edit.addEventListener("click", editDetails);
  
  //edit function
  function editDetails(e) {
    e.preventDefault();

    // Create input fields for editing
    let newExpenseInput = document.createElement("input");
    newExpenseInput.type = "number";
    newExpenseInput.value = expensecell.textContent;

    let newDescriptionInput = document.createElement("input");
    newDescriptionInput.type = "text";
    newDescriptionInput.value = descripcell.textContent;

    let newCategoryInput = document.createElement("select");
    newCategoryInput.innerHTML = `
      <option value="Fuel">Fuel</option>
      <option value="Movie">Movie</option>
      <option value="Electricity">Electricity</option>
      <option value="Water">Water</option>
    `;
    newCategoryInput.value = categorycell.textContent;

    // Clear the cell content
    expensecell.textContent = "";
    descripcell.textContent = "";
    categorycell.textContent = "";

    // Append input fields to the respective cells
    expensecell.appendChild(newExpenseInput);
    descripcell.appendChild(newDescriptionInput);
    categorycell.appendChild(newCategoryInput);

    // Create Save button
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.className = "del_edit";

    // Replace the Edit button with the Save button
    editCell.innerHTML = "";
    editCell.appendChild(saveButton);

    // Apply function when clicking the Save button
    saveButton.addEventListener("click", saveDetails);

    function saveDetails() {
      // Update the cell content with the new values from input fields
      expensecell.textContent = newExpenseInput.value;
      descripcell.textContent = newDescriptionInput.value;
      categorycell.textContent = newCategoryInput.value;

      // Remove the input fields and save button
      newExpenseInput.remove();
      newDescriptionInput.remove();
      newCategoryInput.remove();
      saveButton.remove();

      // Restore the Edit button
      editCell.innerHTML = "";
      editCell.appendChild(edit);

      setData();
    }
  }
 
  expense.value = "";
  descrip.value = "";
  category.value = "-- Category --";
}

//Function to add details on Local Storage
function setData() {
  localStorage.setItem("details", addDetails.innerHTML);
}

 //To get Data from Local Storage
function getData() {
  addDetails.innerHTML = localStorage.getItem('details');
  
}
getData();