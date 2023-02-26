import Pet from "./Pet.jsx";

const Results = ({ pets }) => (
  <div className="search">
    {pets.length === 0 ? (
      <h1>No Pets Found</h1>
    ) : (
      pets.map((pet) => (
        <Pet
          animal={pet.animal}
          name={pet.name}
          breed={pet.breed}
          images={pet.images}
          location={`${pet.city}, ${pet.state}`}
          id={pet.id}
          key={pet.id}
        />
      ))
    )}
  </div>
);

export default Results;
