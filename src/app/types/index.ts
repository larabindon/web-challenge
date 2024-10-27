export interface UserInfo {
  username: string;
  jobTitle: string;
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: CharacterEpisode[];
}

export interface CharacterEpisode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export interface CharactersResponse {
  results: Character[];
}
