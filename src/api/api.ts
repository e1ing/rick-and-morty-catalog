import axios from 'axios'

const settings = {
  //withCredentials: true,
  headers: {},
}

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  ...settings,
})
//types
export type GetEpisodeResponseType = {
  info: {
    count: number
    pages: number
    next: string
    prev: string | null
  }
  results: Array<EpisodeAPIType>
}

export type GetCharactersResponseType = {
  info: {
    count: number
    pages: number
    next: string
    prev: string | null
  }
  results: Array<CharacterAPIType>
}

export type GetLocationsResponseType = {
  info: {
    count: number
    pages: number
    next: string
    prev: string | null
  }
  results: Array<LocationAPIType>
}

export type EpisodeAPIType = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: Array<string>
  url: string
  created: string
}

type LocationAPIType = {
  id: number
  name: string
  type: string
  dimension: string
  residents: Array<string>
  url: string
  created: string
}
type CharacterAPIType = {
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
    return instance.get<GetEpisodeResponseType>(`episode`)
  },
  getSingleEpisode(id: number) {
    return instance.get<EpisodeAPIType>(`episode/?id=${id}`)
  },
  getMultipleEpisodes(episodes_id: Array<number>) {
    return instance.get<Array<EpisodeAPIType>>(`episode/?[]=${episodes_id}`)
  },

  // characters
  getCharacters() {
    return instance.get<GetCharactersResponseType>(`character`)
  },
  getSingleCharacter(id: number) {
    return instance.get<CharacterAPIType>(`character/?id=${id}`)
  },
  getMultipleCharacter(characters_id: Array<number>) {
    return instance.get<Array<CharacterAPIType>>(
      `character/?[]=${characters_id}`
    )
  },

  //locations
  getLocations() {
    return instance.get<GetLocationsResponseType>(`location`)
  },
  getSingleLocation(id: number) {
    return instance.get<LocationAPIType>(`location/?id=${id}`)
  },
  getMultipleLocations(locations_id: Array<number>) {
    return instance.get<Array<LocationAPIType>>(`location/?[]=${locations_id}`)
  },
}
