import PokemonView from "components/pokemon/View";
import useFetch from "hooks/useFetch";
import { PUBLIC_POKEMON_API } from "src/config/env";
import type { PokemonListResponse } from "types/pokemon";

const List = () => {
  const { data: pokemonList, loading } = useFetch<PokemonListResponse>(
    `${PUBLIC_POKEMON_API}?limit=20`,
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!pokemonList) {
    return null;
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {pokemonList.results.map(({ url }) => {
          const pokemonId = url.split("/").reverse()[1];
          return (
            <div key={pokemonId} style={{ width: 200 }}>
              <div className="pokemon-list-element">
                <a href={`pokemon/view?id=${pokemonId}`}>
                  <PokemonView id={pokemonId} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
