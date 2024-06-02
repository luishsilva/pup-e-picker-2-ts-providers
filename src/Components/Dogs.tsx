// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
import { DogCard } from "./DogCard";
import { useDogs } from "../providers/DogsProvider";
import { toast } from "react-hot-toast";

export const Dogs = () => {
  const { activeTab, deleteDog, dogs, updateDog, isLoading, favoritedDogs, unFavoritedDogs } = useDogs();

  const filteredDogs =
    activeTab === "all-dogs"
      ? dogs
      : activeTab == "favorited" ? favoritedDogs : unFavoritedDogs;

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {filteredDogs.length > 0 &&
        filteredDogs.map((dog) => (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name
            }}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog.id);
            }}
            onHeartClick={() => {
              updateDog(dog.id, false);
            }}
            onEmptyHeartClick={() => {
              updateDog(dog.id, true);
            }}
            isLoading={isLoading}
          />
        ))}
    </>
  );
};
