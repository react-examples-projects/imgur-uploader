import { IMAGE_URL, ACCESS_TOKEN, IMAGES } from "../api/imgur";

export default async function uploadImageData({ inputFileRef, description }) {
  const fd = new FormData();
  fd.append("image", inputFileRef.current.files[0]);
  fd.append("description", description);

  const res = await fetch(IMAGE_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },

    body: fd,
  });
  const json = await res.json();
  const data = json?.data;
  return { data, link: data?.link };
}

export async function deleteImageData(id) {
  const res = await fetch(`${IMAGE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  });
  const json = await res.json();
  const data = json?.data;
  return { data, link: data?.link };
}

export async function getImages(page = 0) {
  const res = await fetch(IMAGES(page), {
    headers: {
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  });
  const json = await res.json();
  const data = json?.data;
  return data;
}
