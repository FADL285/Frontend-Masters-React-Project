import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../api/fetchPet.js";
import Carousel from "../components/Carousel.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";
import { useContext, useState } from "react";
import Modal from "../components/Modal.jsx";
import AdoptedPetContext from "../contexts/AdoptedPetContext.js";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [_, setAdoptedPet] = useContext(AdoptedPetContext); // eslint-disable-line no-unused-vars
  const results = useQuery(["details", id], fetchPet);
  const navigate = useNavigate();

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (results.data.numberOfResults === 0) {
    return (
      <h2 className="text-center">
        No pet found with that ID. <br />
        <Link to="/">Click here</Link> to back to the home page.
      </h2>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet?.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
      {showModal ? (
        <Modal>
          <h1>Would you like to adopt {pet.name}?</h1>
          <div className="buttons">
            <button
              onClick={() => {
                setAdoptedPet(pet);
                navigate("/");
              }}
            >
              Yes
            </button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
