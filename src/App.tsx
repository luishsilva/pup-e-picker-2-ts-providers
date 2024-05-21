import { useEffect, useState } from "react";
import { Requests } from "./api";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { Dog } from "./types";
import Toast from "react-hot-toast";

export function App() {

  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    refetchData();
  }, []); 

  const refetchData = () => {
    Requests.getAllDogs()
    .then(setDogs)
    .catch(error => { 
      Toast.error('Error fetching dogs:', error);
    })
  }

  const updateDog = (id: number, isFavorite: boolean) => {
    setDogs(
      dogs.map((dog) => 
        dog.id === id ? {...dog, isFavorite: isFavorite} : dog 
      )
    );
    Requests.patchFavoriteForDog(id, isFavorite)
    .then(refetchData);
  }

  const deleteDog = (id: number) => {
    const filteredDogs = dogs.filter(dog => dog.id !== id)
    setDogs(filteredDogs);
  }

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        <Dogs 
          deleteDog ={deleteDog}
          dogs={dogs} 
          updateDog={updateDog}
        />
      </Section>
    </div>
  );
}
