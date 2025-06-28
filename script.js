// Fetching all the required elements from HTML

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const tbody = document.getElementById('studentTableBody');
  let students = JSON.parse(localStorage.getItem('students')) || [];

// Creating the table to store the entered data  

  function renderTable() {
    tbody.innerHTML = '';
    students.forEach((student, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td class="actions">
          <button class="edit" data-index="${index}"><i class="fas fa-edit"></i></button>
          <button class="delete" data-index="${index}"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

// Function to handle form submission and saving data to local storage
  
  function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.studentName.value.trim();
    const id = form.studentID.value.trim();
    const email = form.email.value.trim();
    const contact = form.contact.value.trim();

  // Regular expression for input types

    const nameRegex = /^[a-zA-Z\s]+$/;
    const numberRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation checks for all the fields 

  if (!nameRegex.test(name)) {
    alert("Name must contain only letters and spaces.");
    return;
  }

  if (!numberRegex.test(id)) {
    alert("Student ID must contain only numbers.");
    return;
  }

  if (!numberRegex.test(contact)) {
    alert("Contact number must contain only numbers.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  
    students.push({ name, id, email, contact });
    saveToLocalStorage();
    renderTable();
    form.reset();
  });

  // Functionality for edit and delete buttons

  tbody.addEventListener('click', (e) => {
    const index = e.target.closest('button')?.dataset.index;
    if (e.target.closest('.delete')) {
      students.splice(index, 1);
      saveToLocalStorage();
      renderTable();
    } else if (e.target.closest('.edit')) {
      const student = students[index];
      form.studentName.value = student.name;
      form.studentID.value = student.id;
      form.email.value = student.email;
      form.contact.value = student.contact;
      students.splice(index, 1);
    }
  });

  renderTable();
});
