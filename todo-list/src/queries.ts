import { gql } from '@apollo/client';

export const ALL_TODO_ITEMS = gql`
  query {
    allItems {
      id
      content
      done
    }
  }
`
