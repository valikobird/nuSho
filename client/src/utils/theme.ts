const checkDefaultTheme = () => {
  const isDarckTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarckTheme);
  return isDarckTheme;
};

export default checkDefaultTheme;
