const intTeamSelect = document.querySelector('#interactiveTeamName');
const intTeamYearSelect = document.querySelector('#interactiveTeamYear');
const submitButton = document.querySelector('#submit');
const playerSubmitButton = document.querySelector('#playerSubmit')
const teamSubmitButton = document.querySelector('#teamSubmit')

const teamSelectChange = () => {
  intTeamYearSelect.disabled = true;
  document.querySelectorAll('#teamYear option').forEach(option => option.remove());

  const value = intTeamSelect.value.split('.');
  const year = Number(value[1]);
  const currentYear = new Date().getFullYear();

  const placeholder = document.createElement('option');
  placeholder.hidden = true;
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.value = null;
  placeholder.innerHTML = "Select a Year";
  intTeamYearSelect.appendChild(placeholder);

  for (var i = year; i<=currentYear; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    intTeamYearSelect.appendChild(opt);
  }
  intTeamYearSelect.disabled = false;
}

const submit = () => {
  document.interactiveForm.submit();
}

const playerSubmit = () => {
  document.playerForm.submit();
}

const teamSubmit = () => {
  document.teamForm.submit();
}

intTeamSelect.addEventListener('change', teamSelectChange);
submitButton.addEventListener('click', submit);
playerSubmitButton.addEventListener('click', playerSubmit);
teamSubmitButton.addEventListener('click', teamSubmit);