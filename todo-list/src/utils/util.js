export const validarImputForm = e => {
  //Guardo datos de selects si los hay
  const selectHtml = e.target.parentElement.parentElement.querySelectorAll(
    'select',
  );

  //Guardo datos de inputs
  let inputsHtml = e.target.parentElement.parentElement.querySelectorAll(
    '.datos input',
  );

  //Valido inputs
  const input = Object.values(inputsHtml).some(
    input => input.value.length === 0,
  );

  //Valido selects
  let select = false;
  if (selectHtml) {
    select = Object.values(selectHtml).some(select => select.value === '0');
  }

  //Devuelvo false si los campos estan correctos y true si hay algun campo sin llenar
  if (input || select) {
    return true;
  } else {
    return false;
  }
};

export const enterHandler = (visible, addItem) => {
  document.addEventListener('keypress', e => {
    if (visible === false && e.code === 'Enter') {
      addItem();
    }
  });
};
