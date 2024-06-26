import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";
export const endPoint = "dogs";

/**
 * Retrieves all dogs from the server.
 */
const getAllDogs = () => {
  return fetch(`${baseUrl}/${endPoint}`, {
    method: "GET"
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed with status ${response.status}`);
    }
    return response.json();
  });
};

const postDog = (dog: Omit<Dog, "id">) => {
  return fetch(`${baseUrl}/${endPoint}`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed with status ${response.status}`);
    }
    return response.json();
  });
};

const deleteDogRequest = (id: number) => {
  return fetch(`${baseUrl}/${endPoint}/${id}`, {
    method: "DELETE"
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed with status ${response.status}`);
    }
    return response.json();
  });
};

const patchFavoriteForDog = (id: number, isFavorite: boolean) => {
  return fetch(`${baseUrl}/${endPoint}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isFavorite: isFavorite
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP failed with status ${response.status}`);
    }
    return response.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs
};
