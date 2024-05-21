
import { Dog } from "./types";

export const baseUrl = 'http://localhost:3000';
export const endPoint = 'dogs';

/**
   * Retrieves all dogss from the server.
   * @returns {Promise<Dogs[]>} A promise that resolves to an array of dogs.
   */
const getAllDogs = (): Promise<Dog[]> => {
  return fetch(`${baseUrl}/${endPoint}`, {
    method: 'GET',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => data as Dog[])
  .catch(error => {
    console.error('There has been a problem with your fetch operation', error)
    throw error;
  })
};

const postDog = () => {
  // fill out method
};
const deleteDogRequest = (id: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/${endPoint}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          reject(new Error('Failed to delete dog'));
        } else {
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const patchFavoriteForDog = (id: number, isFavorite: boolean): Promise<Dog[]> => {
   return fetch(`${baseUrl}/${endPoint}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      isFavorite: isFavorite
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json());
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
