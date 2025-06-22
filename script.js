

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const tbody = document.getElementById('studentTableBody');
  let students = JSON.parse(localStorage.getItem('students')) || [];

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