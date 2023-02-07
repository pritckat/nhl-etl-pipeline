const teamSelect = document.querySelector('#teamName');
const teamYearSelect = document.querySelector('#teamYear');

const teamSelectChange = () => {
  teamYearSelect.disabled = true;
  document.querySelectorAll('#teamYear option').forEach(option => option.remove());

  const value = teamSelect.value.split('.');
  const year = Number(value[1]);
  const currentYear = new Date().getFullYear();

  const placeholder = document.createElement('option');
  placeholder.hidden = true;
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.value = null;
  placeholder.innerHTML = "Select a Year";
  teamYearSelect.appendChild(placeholder);

  for (var i = year; i<=currentYear; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    teamYearSelect.appendChild(opt);
  }
  teamYearSelect.disabled = false;
}

teamSelect.addEventListener('change', teamSelectChange);