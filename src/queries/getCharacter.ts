import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        pages
      }
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`;
