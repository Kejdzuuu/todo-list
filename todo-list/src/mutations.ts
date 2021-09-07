import { gql } from '@apollo/client';

export const ADD_ITEM = gql`
  mutation addItem($content: String!) {
    addItem(
      content: $content
    ) {
      id,
      content,
      done
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation removeItem($id: String!) {
    removeItem(
      id: $id
    )
  }
`;

export const UPDATE_ITEM = gql`
  mutation updateItem($id: String!) {
    updateItem(
      id: $id
    )
  }
`;
