import * as React from "react";

type ObjectWithReactNodeProps<T> = { [K in keyof T]: React.ReactNode };
type DisplayMethods<T> = { [K in keyof T]?: (value: T[K]) => React.ReactNode };
type ColumnTitles<T> = { [K in keyof T]: string };

export interface GenericTableProps<
  TData extends ObjectWithReactNodeProps<TData>
> {
  data: TData[];
  displayMethods?: DisplayMethods<TData>;
  titles: ColumnTitles<TData>;  
}

export class GenericTable<
  TData extends ObjectWithReactNodeProps<TData>
> extends React.PureComponent<GenericTableProps<TData>> {
  render() {
    const { data, displayMethods, titles } = this.props;

    return data.length > 0 ? (
      <table>
        <tr>
          {Object.getOwnPropertyNames(data[0]).map((columName, ci) => (
            <th key={ci}>{titles[columName]}</th>
          ))}
        </tr>
        {data.map((row, ri) => (
          <tr key={ri}>
            {Object.getOwnPropertyNames(row).map((colName, ci) => (
              <td key={ci}>
                {displayMethods[colName] !== undefined
                  ? displayMethods[colName](row[colName])
                  : row[colName]}
              </td>
            ))}
          </tr>
        ))}
      </table>
    ) : null;
  }
}
