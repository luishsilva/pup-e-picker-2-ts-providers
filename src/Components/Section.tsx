import { ReactNode } from "react";
import { useDogs } from "../providers/DogsProvider";

export const Section = ({
  label,
  children
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { activeTab, dogs, setActiveTab, favoritedDogs, unFavoritedDogs } = useDogs();

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the all favorite and unfavorite dogs */}
          <div
            className={`selector ${activeTab === "all-dogs" && "active"}`}
            onClick={() => {
              setActiveTab("all-dogs");
            }}
          >
            All dogs ( {dogs.length} )
          </div>
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorited" && "active"}`}
            onClick={() => {
              setActiveTab("favorited");
            }}
          >
            Favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unfavorited" && "active"}`}
            onClick={() => {
              setActiveTab("unfavorited");
            }}
          >
            Unfavorited ( {unFavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activeTab === "create-dog" && "active"}`}
            onClick={() => {
              setActiveTab("create-dog");
            }}
          >
            Create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
