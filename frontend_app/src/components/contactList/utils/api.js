import uuidv4 from 'uuid/v4';

import capitalize from '../utils/capitalize';
import productos from '../../../productos.json';

const productosResponse = productos;

const mapContact = contact => {
  const {
    name, picture, phone, cell, email,
  } = contact;

  return {
    id: uuidv4(),
    name: `${capitalize(name.first)} ${capitalize(name.last)}`,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};

const mapProductos = producto => {
  const {
    id, nombre, descripcion, urlImagen, descuento, tempoints, almacen,
  } = producto;

  return {
    id: id,
    nombre: `${capitalize(nombre)}`,
    descripcion: descripcion,
    urlImagen: urlImagen,
    descuento: descuento,
    tempoints: tempoints,
    almacen: almacen,
  };
};

export const fetchProductos = async () => {
  productosData = productosResponse;

  return productosData.results.map(mapProductos);
};

export const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
  const contactData = await response.json();

  return contactData.results.map(mapContact);
};

export const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const userData = await response.json();

  return mapContact(userData.results[0]);
};

export const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const userData = await response.json();

  return mapContact(userData.results[0]);
};
