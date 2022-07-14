import { gql } from "@apollo/client";

export const GET_TRANSACTION_INFO = gql`
  query GetTransaction {
    transaction {
      id
      name
      status
      type
      date
    }
  }
`;
