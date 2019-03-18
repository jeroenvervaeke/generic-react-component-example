import * as React from "react";

type ObjectWithReactNodeProps<T> = { [K in keyof T]: React.ReactNode };
type DisplayMethods<T> = {
  [K in keyof T]?: (value: React.ReactNode) => React.ReactNode
};
type ColumnTitles<T> = { [K in keyof T]: string };

export interface GenericTableProps<
  TData extends ObjectWithReactNodeProps<TData>
> {
  data: TData[];
  displayMethods?: DisplayMethods<TData>;
  titles: ColumnTitles<TData>;
}

// Dirty hack to make getOwnPropertyNames work properly
declare class Object {
  static getOwnPropertyNames<T>(o: T): (keyof T)[];
}

export class GenericTable<
  TData extends ObjectWithReactNodeProps<TData>
> extends React.PureComponent<GenericTableProps<TData>> {
  renderCell(
    cell: React.ReactNode,
    renderer?: (value: React.ReactNode) => React.ReactNode
  ) {
    return renderer !== undefined ? renderer(cell) : cell;
  }

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
                {displayMethods !== undefined
                  ? this.renderCell(row[colName], displayMethods[colName])
                  : row[colName]}
              </td>
            ))}
          </tr>
        ))}
      </table>
    ) : null;
  }
}
