import PokemonView from "components/pokemon/View";
import useFetch from "hooks/useFetch";
import type { PokemonListResponse } from "types/pokemon";

const List = () => {
  const { data: pokemonList, loading } = useFetch<PokemonListResponse>(
    `${import.meta.env.PUBLIC_POKEMON_API}?limit=10`,
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!pokemonList) {
    return null;
  }

  return (
    <div>
      <ul>
        {pokemonList.results.map(({ url }) => {
          const pokemonId = url.split("/").reverse()[1];
          return (
            <li key={pokemonId}>
              <div className="pokemon-list-element">
                <a href={`pokemon/view?id=${pokemonId}`}>
                  <PokemonView id={pokemonId} />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
