import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

export const BooksDemo: React.FC = () => {
  const query = gql`
    {
      books {
        title
        author {
          name
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(query);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{JSON.stringify(data)} </div>;
};
