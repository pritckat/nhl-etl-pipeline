const intTeamSelect = document.querySelector('#interactiveTeamName');
const intTeamYearSelect = document.querySelector('#interactiveTeamYear');
const submitButton = document.querySelector('#submit');
const playerSubmitButton = document.querySelector('#playerSubmit')
const teamSubmitButton = document.querySelector('#teamSubmit')
const currentYear = new Date().getFullYear();

const teamSelectChange = () => {
  intTeamYearSelect.disabled = true;
  document.querySelectorAll('#interactiveTeamYear option').forEach(option => option.remove());

  const value = intTeamSelect.value.split('.');
  const year = Number(value[1]);
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

const yearSelectChange = () => {
  submitButton.disabled = false;
}

const submit = () => {
  document.interactiveForm.submit();
}

const playerSubmit = () => {
  const playerYear = document.querySelector('#playerYear').value
  const playerId = document.querySelector('#playerId').value;
  if (!playerYear || !playerId) {
    return;
  }
  if (/^\d+$/.test(playerId) && /^\d+$/.test(playerYear)) {
    document.playerForm.submit();
  } else {
    return;
  }
}

const teamSubmit = () => {
  const teamYear = document.querySelector('#teamYear').value
  const teamId = document.querySelector('#teamId').value;
  if (!teamId || !teamId) {
    return;
  }
  if (/^\d+$/.test(teamId) && /^\d+$/.test(teamYear)) {
    document.teamForm.submit();
  } else {
    return;
  }
}

intTeamSelect.addEventListener('change', teamSelectChange);
intTeamYearSelect.addEventListener('change', yearSelectChange);
submitButton.addEventListener('click', submit);
playerSubmitButton.addEventListener('click', playerSubmit);
teamSubmitButton.addEventListener('click', teamSubmit);