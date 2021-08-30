import React, { useState } from 'react';
import { GraphQLEditor } from 'graphql-editor';

// type Query and Mutations are set as code and all other types are set as library

// const types = {
//   code: 
// `
// type Query{
// 	pizzas: [Pizza!]
// }
// `
// ,
//   library: 
// `
// type Pizza{
//   name:String
// }
// `
// };

// all types are set in code

const types = {
  code: 
`
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  
  type Continent {
    code: ID!
    name: String!
    countries: [Country!]!
  }
  
  input ContinentFilterInput {
    code: StringQueryOperatorInput
  }
  
  type Country {
    code: ID!
    name: String!
    native: String!
    phone: String!
    continent: Continent!
    capital: String
    currency: String
    languages: [Language!]!
    emoji: String!
    emojiU: String!
    states: [State!]!
  }
  
  input CountryFilterInput {
    code: StringQueryOperatorInput
    currency: StringQueryOperatorInput
    continent: StringQueryOperatorInput
  }
  
  type Language {
    code: ID!
    name: String
    native: String
    rtl: Boolean!
  }
  
  input LanguageFilterInput {
    code: StringQueryOperatorInput
  }
  
  type Query {
    """
    Return continents.
    """
    continents(filter: ContinentFilterInput): [Continent!]!
    continent(code: ID!): Continent
    countries(filter: CountryFilterInput): [Country!]!
    country(code: ID!): Country
    languages(filter: LanguageFilterInput): [Language!]!
    language(code: ID!): Language
  }
  
  type State {
    code: String
    name: String!
    country: Country!
  }
  
  input StringQueryOperatorInput {
    eq: String
    ne: String
    in: [String]
    nin: [String]
    regex: String
    glob: String
  }
`
};

export const App = () => {
const [schema, setSchema] = useState({
  code: types.code,
  libraries: types.library
});

return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor
        onSchemaChange={(props) => {
          setSchema(props);
        }}
        schema={schema}
      />
    </div>
  );
};
