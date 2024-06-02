import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../providers/DogsProvider";
import { toast } from "react-hot-toast";

export const CreateDogForm = () => {
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { postDog, isLoading, setIsLoading } = useDogs();

  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        postDog({
          name: name,
          image: selectedImage,
          description: description,
          isFavorite: false
        })
          .then(() => {
            toast.success("Dog create successfully.");
          })
          .then(() => {
            setName("");
            setDescription("");
            setSelectedImage(dogPictures.BlueHeeler);
          })
          .catch(() => {
            toast.error("Failed to add a new Dog, Please try again.", {
              duration: 2000
            });
          })
          .finally(() => setIsLoading(false));
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        className="form-input"
        disabled={isLoading}
        type="text"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        className="form-input"
        disabled={isLoading}
        name=""
        id=""
        cols={40}
        rows={10}
        onChange={(event) => setDescription(event.target.value)}
        value={description}
      />
      <label htmlFor="picture">Select an Image</label>
      <div className="d-flex align-items">
        <select
          className="form-input"
          disabled={isLoading}
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
          value={selectedImage}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <img
          alt={`Image of ${selectedImage}`}
          className=""
          id="form-image-display"
          src={selectedImage}
        />
      </div>
      <input className="form-input" disabled={isLoading} type="submit" value="Submit" />
    </form>
  );
};
