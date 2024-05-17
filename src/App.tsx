import { useEffect, useState } from "react";
import { Requests } from "./api";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { Dog } from "./types";

export function App() {

  const [allDogs, setAllDogs] = useState<Dog[]>([])

  useEffect(() => {
    refetchData();
  }, []); 

  const refetchData = () => { 
    Requests.getAllDogs().then(setAllDogs).catch(error => { console.error('Error fecthing dogs:', error)})
  }

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
        <Dogs allDogs={allDogs}/>
      </Section>
    </div>
  );
}
