import { useState, useReducer, useMemo, useRef, useCallback } from "react"
import "../static/styles/Characters.css"
import Search from "./Search"
import useCharacters from "./hooks/useCharacters"


const initialState = {
    favorites: []
}

const API = "https://rickandmortyapi.com/api/character/"

const favoriteReducer = (state, action) =>
{
    switch(action.type) {
        case "ADD_TO_FAVORITE" :
        return {
            ...state,
            favorites: [...state.favorites, action.payload]
        }
        default:
         return state;
    }
}

const Characters = (props) => {
/*     const [characters, setCharacters] = useState([]);
 */    const [favorites, dispatch] = useReducer(favoriteReducer, initialState)
    const [search, setSearch] = useState("")
    const searchInput = useRef(null);

    const characters = useCharacters(API)

    const handleClick = favorite => {
        dispatch({ type: "ADD_TO_FAVORITE", payload: favorite })
    }
/* 
    const handleSearch = () => {
        setSearch(searchInput.current.value)
    } */

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value)
    }, [])

/*     const filteredUsers = characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase())
    }) */

    const filteredUsers = useMemo(() => 
        characters.filter((user) => {
            return user.name.toLowerCase().includes(search.toLowerCase())
        }),
        [characters, search]
    )
    
    return (
        <div className="main">
            <span className="title">Tus personajes Favoritos</span>
            <div className="main-container">
                    {favorites.favorites.map(favorite => (
                         <div className="character-container" key={favorite.id}>
                            <img src={favorite.image} alt="a" />
                            <h2>Name: {favorite.name}</h2>
                            <h2>Status: {favorite.status}</h2>
                            <h2>Specie: {favorite.species}</h2>
                            <h2>Gender: {favorite.gender}</h2>
                            <h2>Origin: {favorite.origin.name}</h2>
                        </div>
                    ))}
            </div>

           <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

            <span className="title">Lista de personajes</span>  
            <div className="main-container">
                {filteredUsers.map(character => (
                    <div className="character-container" key={character.id}>
                        <img src={character.image} alt="a" />
                        <h2>Name: {character.name}</h2>
                        <h2>Status: {character.status}</h2>
                        <h2>Specie: {character.species}</h2>
                        <h2>Gender: {character.gender}</h2>
                        <h2>Origin: {character.origin.name}</h2>
                        <button type="button" className="fav-del-button" onClick={() => handleClick(character)}>Agregar a Favoritos </button>
                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default Characters