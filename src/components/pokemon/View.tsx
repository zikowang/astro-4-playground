import useFetch from "hooks/useFetch";
import { PUBLIC_POKEMON_API } from "src/config/env";
import type { Pokemon } from "types/pokemon";

const PokemonView = ({ id = null }: { id?: string | null }) => {
  const paramId = id || new URLSearchParams(window.location.search).get("id");

  const { data: pokemon, loading } = useFetch<Pokemon>(
    `${PUBLIC_POKEMON_API}/${paramId}`,
  );

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div>
      <h2>{pokemon.name.toLocaleUpperCase()}</h2>
      <img src={pokemon.sprites?.front_default} />
    </div>
  );
};

export default PokemonView;
