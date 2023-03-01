import { useContext, useState } from "react";
import useBreadList from "../hooks/useBreadList.js";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../api/fetchSearch.js";
import Results from "../components/Results.jsx";
import AdoptedPetContext from "../contexts/AdoptedPetContext.js";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreadList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  const handleFormSubmission = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const obj = {
      location: formData.get("location") ?? "",
      animal: formData.get("animal") ?? "",
      breed: formData.get("breed") ?? "",
    };
    setRequestParams(obj);
  };

  return (
    <div className="search-params">
      <form onSubmit={handleFormSubmission}>
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(event) => {
              setAnimal(event.target.value);
            }}
            onBlur={(event) => {
              setAnimal(event.target.value);
            }}
          >
            <option value="" disabled hidden>
              Select an animal
            </option>
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            defaultValue=""
            name="breed"
            disabled={!breeds.length}
          >
            <option value="" disabled hidden>
              Select a breed
            </option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} isLoading={results.isLoading} />
    </div>
  );
};

export default SearchParams;
