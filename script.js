let allProfiles = [];
let editId = '';

// Fucntions To run on Window Load
window.addEventListener('load', () => {
  dataStorage();
  addRowToTable();
});

// Get Values from FORM
const getValues = () => {
  const fName = document.querySelector('#firstName').value;
  const lName = document.querySelector('#lastName').value;
  const gender = document.querySelector('[name=gender]:checked')?.value;
  const hobs = [];
  document.querySelectorAll('[name=hobbies]:checked')?.forEach((v) => {
    hobs.push(v.value);
  });
  const email = document.querySelector('#emailAddress').value;
  const password = document.querySelector('#password').value;
  const cPassword = document.querySelector('#confirmPassword').value;

  const profile = {
    id: Date.now(),
    fName,
    lName,
    gender,
    hobs,
    email,
    password,
    cPassword,
  };
  if (editId !== '') {
    profile.id = editId;
    allProfiles.splice(
      allProfiles.findIndex((objID) => objID.id === editId),
      1,
      profile
    );
    editId = null;
  } else {
    allProfiles.push(profile);
  }
  // Store To Database
  localStorage.setItem('allProfiles', JSON.stringify(allProfiles));
  dataStorage();
  addRowToTable();
  document.getElementById('myForm').reset();
};

// Fetch From Database
const dataStorage = () => {
  if (localStorage.getItem('allProfiles')) {
    allProfiles = JSON.parse(localStorage.getItem('allProfiles'));
  }
};

// Add Row To Table
const addRowToTable = () => {
  let tableBody = '';
  allProfiles?.map((v) => {
    tableBody += `
    <tr>
        <td>${v.id}</td>          
        <td>${v.fName}</td>
        <td>${v.lName}</td>
        <td>${v.gender}</td>
        <td>${v.hobs}</td>
        <td>${v.email}</td>
        <td>${v.password}</td>
        <td>
          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow(${v.id})">Edit</button>
          <button class="btn btn-danger" onclick="deleteRows(${v.id})">Delete</button>
        </td>
    </tr>    
    `;
  });
  document.querySelector('#tbody').innerHTML = tableBody;
};

// Delete Row
const deleteRows = (id) => {
  allProfiles.forEach((obj, i) => {
    if (obj.id === id) {
      allProfiles.splice(i, 1);
    }
  });
  localStorage.setItem('allProfiles', JSON.stringify(allProfiles));
  dataStorage();
  addRowToTable();
};

// Update Row
const editRow = (id) => {
  editId = id;
  allProfiles.forEach((obj) => {
    if (obj.id === id) {
      document.querySelector('#firstName').value = obj.fName;
      document.querySelector('#lastName').value = obj.lName;
      document.querySelectorAll('[name=gender],[name=hobbies]').forEach((v) => {
        v.checked = false;
      });
      document.querySelector(`[value=${obj.gender}]`).checked = true;
      obj.hobs.map((hobby) => {
        document.querySelector(`[value=${hobby}]`).checked = true;
      });
      document.querySelector('#emailAddress').value = obj.email;
      document.querySelector('#password').value = obj.password;
    }
  });
};
