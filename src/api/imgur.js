// token para acceder a datos personales de la cuenta de imgur
// se vende dentro de 1 mes
export const ACCESS_TOKEN = "7a8ce62cd7ef63ddb9f5d9c857b32f4edc73742b";
export const REFRESH_TOKEN = "a6c94293616eded45e4d95170fd6fcd2bb1f5f70";
export const CODE = "2fb5c33099758847659de6ced68c1830e160561b";

// identificadores para acceder a recursos publicos
export const CLIENT_ID = "5e4cbc941775efe";
export const CLIENT_SECRET = "40edf7cce617e4a9b67c2d7f8a41ba003ebabda0";
export const USER = "me";
const BASE_URL = "https://api.imgur.com/3/";
export const IMAGE_URL = BASE_URL + "image";
export const IMAGES = (page = 0) => `${BASE_URL}account/${USER}/images/${page}`;
