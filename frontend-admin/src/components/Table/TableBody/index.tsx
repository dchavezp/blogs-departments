import { userSelectedService } from "@/services/sharing.service";
import { DataTableHeader, UserInfo } from "@/types";
import React from "react";
import TableActions from "../TableActions";
import ColumnTable from "./ColumnTable";
import RowTable from "./RowTable";

interface TableBodyProps {
  data: any[];
  keys: DataTableHeader[];
  hasActions?: boolean;
  actions?: React.ReactNode;
}

function TableBody({ keys, data, hasActions, actions }: TableBodyProps) {
  return (
    <tbody>
      {data.map((item) => {
        return (
          <RowTable key={item["id"]}>
            <>
              {keys.map((columnId) => {
                if (hasActions && columnId.key === "actions") {
                  return (
                    <ColumnTable key={item["id"] + columnId.key}>
                      <TableActions
                        onClick={() => {
                          userSelectedService.setSubject(item as UserInfo);
                        }}
                      />
                    </ColumnTable>
                  );
                } else if (typeof item[`${columnId.key}`] === "object") {
                  return (
                    <ColumnTable key={item["id"] + columnId.key}>
                      {item[`${columnId.key}`]["name"]}
                    </ColumnTable>
                  );
                }
                return (
                  <ColumnTable key={item["id"] + columnId.key}>
                    {item[`${columnId.key}`]}
                  </ColumnTable>
                );
              })}
            </>
          </RowTable>
        );
      })}
    </tbody>
  );
}

export default TableBody;
