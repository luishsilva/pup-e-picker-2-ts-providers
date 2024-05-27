import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { useDogs } from "./Components/providers/DogsProvider";
import { CreateDogForm } from "./Components/CreateDogForm";

export function App() {
  const { activeTab } = useDogs();

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        {activeTab !== "create-dog" ? <Dogs /> : <CreateDogForm />}
      </Section>
    </div>
  );
}
