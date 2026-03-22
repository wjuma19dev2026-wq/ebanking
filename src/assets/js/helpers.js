export const generarUsernames = (accs) => {
  return accs.map((acc) => {
    const partes = acc.owner
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/\s+/)
      .map((name) => (name.length < 2 ? name[0] : name));
    const inicial = partes[0].charAt(0);
    const apellido = partes[1];
    acc.username = `${inicial}${apellido}`;
    return acc;
  });
};

export const createUsername = (acc) => {
  const partes = acc.owner
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .map((name) => (name.length < 2 ? name[0] : name));
  const inicial = partes[0].charAt(0);
  const apellido = partes[1];
  acc.username = `${inicial}${apellido}`;
  return acc;
};
