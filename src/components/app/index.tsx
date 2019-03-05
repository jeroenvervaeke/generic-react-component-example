import * as React from "react";
import { GenericTable } from "../generic-table";
import { Person } from "../../types/person";

const people: Person[] = [
  { firstName: "John", lastName: "Doe", birthday: new Date(1984, 2, 21) },
  { firstName: "Jane", lastName: "Doe", birthday: new Date(1982, 6, 11) }
];

const currentYear = new Date().getFullYear();

export const App = React.memo(() => (
  <React.Fragment>
    <h1>Generic tables</h1>
    <GenericTable<Person>
      data={people}
      displayMethods={{ birthday: value => currentYear - value.getFullYear() }}
      titles={{
        firstName: "First name",
        lastName: "Last name",
        birthday: "Age"
      }}
    />
  </React.Fragment>
));
