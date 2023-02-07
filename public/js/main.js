const teamSelect = document.querySelector('#teamName');

const teamSelectChange = () => {
    const value = teamSelect.value.split('.');
    const id = value[0];
    const year = Number(value[1]);
    console.log('change', id, year);
}

teamSelect.addEventListener('change', teamSelectChange)