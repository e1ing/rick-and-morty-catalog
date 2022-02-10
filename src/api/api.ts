import axios from 'axios'

const settings = {
  withCredentials: true,
  headers: {},
}

const instance = axios.create({
  baseURL: 'ttps://rickandmortyapi.com/api/',
  ...settings,
})

//types
type EpisodeType = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: Array<string>
  url: string
  created: string
}

type LocationType = {
  id: number
  name: string
  type: string
  dimension: string
  residents: Array<string>
  url: string
  created: string
}
type CharacterType = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: Array<string>
  url: string
  created: string
}

export const rickAndMortyApi = {
  // episodes
  getEpisodes() {
    return instance.get<Array<EpisodeType>>(`episode`)
  },
  getEpisode(id: number) {
    return instance.get<EpisodeType>(`episode/?id=${id}`)
  },
  getMultipleEpisodes(episodes_id: Array<number>) {
    return instance.get<EpisodeType[]>(`episode/?[]=${episodes_id}`)
  },

  // characters
  getCharacters() {
    return instance.get<Array<CharacterType>>(`character`)
  },
  getSingleCharacter(id: number) {
    return instance.get<CharacterType>(`character/?id=${id}`)
  },
  getMultipleCharacter(characters_id: Array<number>) {
    return instance.get<Array<CharacterType>>(`character/?[]=${characters_id}`)
  },

  //locations
  getLocations() {
    return instance.get<Array<LocationType>>(`location`)
  },
  getSingleLocation(id: number) {
    return instance.get<LocationType>(`location/?id=${id}`)
  },
  getMultipleLocations(locations_id: Array<number>) {
    return instance.get<Array<LocationType>>(`location/?[]=${locations_id}`)
  },
}
