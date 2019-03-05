import * as React from "react";
import { GenericTable } from "../generic-table";
import { Person } from "../../types/person";
import { Hosting } from "../../types/hosting";

const people: Person[] = [
  { firstName: "John", lastName: "Doe", birthday: new Date(1984, 2, 21) },
  { firstName: "Jane", lastName: "Doe", birthday: new Date(1982, 6, 11) }
];

const hosting: Hosting[] = [
  { name: "Azure - F4s", cores: 4, ram: 32, price: 190.15 },
  { name: "SSDNodes - 2X-Large", cores: 4, ram: 32, price: 14.99 },
  { name: "Digitalocean", cores: 8, ram: 32, price: 160 }
];

const currentYear = new Date().getFullYear();

export const App = React.memo(() => (
  <React.Fragment>
    <h1>Generic tables</h1>
    <h2>People</h2>
    <GenericTable<Person>
      data={people}
      displayMethods={{ birthday: value => currentYear - value.getFullYear() }}
      titles={{
        firstName: "First name",
        lastName: "Last name",
        birthday: "Age"
      }}
    />
    <h2>Cloud providers</h2>
    <GenericTable<Hosting>
      data={hosting}
      displayMethods={{
        price: value => `€ ${value}`,
        ram: value => `${value}Gb`
      }}
      titles={{
        name: "Description",
        cores: "Number of cores",
        price: "Price per month (3 year fixed)",
        ram: "Ram"
      }}
    />
  </React.Fragment>
));
