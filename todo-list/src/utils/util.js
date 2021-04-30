export const validarImputForm = e => {
  let inputsHtml = e.target.parentElement.parentElement.querySelectorAll(
    '.datos input',
  );
  const input = Object.values(inputsHtml).some(
    input => input.value.length === 0,
  );
  return input;
};

export const enterHandler = (visible, addItem) => {
  document.addEventListener('keypress', e => {
    if (visible === false && e.code === 'Enter') {
      addItem();
    }
  });
};
