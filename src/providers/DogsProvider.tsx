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
  postDog: (dog: Omit<Dog, "id">) => Promise<void>;
  favoritedDogs: Dog[];
  unFavoritedDogs: Dog[];
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
    return Requests.patchFavoriteForDog(id, isFavorite)
      .then(() => {
        toast.success("The dog was updated successfully.");
        return;
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again later.");
        return setDogs(dogs);
      });
  };

  const deleteDog = (id: number) => {
    setDogs(dogs.filter((dog) => dog.id !== id));
    return Requests.deleteDogRequest(id)
      .then(() => {
        toast.success("The dog was deleted successfully.");
        return;
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again later.");
        return setDogs(dogs);
      });
  };

  const postDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(refetchData)
      .then(() => {
        toast.success("The dog was added successfully.");
        return;
      })
      .catch(() => {
        toast.success("Failed to add a new Dog, Please try again.");
        return;
      })
      .finally(() => setIsLoading(false));
  };

  const favoritedDogs = dogs.filter((dog) => dog.isFavorite);
  const unFavoritedDogs = dogs.filter((dog) => !dog.isFavorite);

  return (
    <DogsContext.Provider
      value={{
        dogs,
        updateDog,
        deleteDog,
        activeTab,
        setActiveTab,
        isLoading,
        postDog,
        favoritedDogs,
        unFavoritedDogs,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
