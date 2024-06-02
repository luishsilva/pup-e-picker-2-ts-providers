import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction
} from "react";
import { Dog, ActiveTab } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

type DogsProviderType = {
  dogs: Dog[];
  updateDog: (id: number, isFavorite: boolean) => void;
  deleteDog: (id: number) => Promise<void>;
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  postDog: (dog: Omit<Dog, "id">) => Promise<void>;
};

const DogsContext = createContext<DogsProviderType>({} as DogsProviderType);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all-dogs");

  useEffect(() => {
    refetchData();
  }, []);

  const refetchData = () => {
    return Requests.getAllDogs()
      .then(setDogs)
      .catch((error) => {
        toast.error("Error fetching dogs:", error);
      });
  };

  const updateDog = (id: number, isFavorite: boolean) => {
    setDogs(dogs.map((dog) => (dog.id === id ? { ...dog, isFavorite: isFavorite } : dog)));
    Requests.patchFavoriteForDog(id, isFavorite)
      .then((response) => {
        if (!response.ok) {
          setDogs(dogs);
          toast.error("Something went wrong. Please try again later.");
        } else return;
      });
  };

  const deleteDog = (id: number) => {
    const filteredDogs = dogs.filter((dog) => dog.id !== id);
    setDogs(filteredDogs);
    return Requests.deleteDogRequest(id)
      .then((response) => {
        if (!response.ok) {
          setDogs(dogs);
          toast.error("Something went wrong. Please try again later.");
        } else return;
      })
      .finally(() => setIsLoading(false));
  };

  const postDog = (dog: Omit<Dog, "id">) => {
    return Requests.postDog(dog).then(refetchData);
  };

  return (
    <DogsContext.Provider
      value={{
        dogs,
        updateDog,
        deleteDog,
        activeTab,
        setActiveTab,
        isLoading,
        setIsLoading,
        postDog
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
