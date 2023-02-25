import { DataTableHeader } from "@/types";
import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import styles from "./table.module.css";
interface TableProps {
  header: DataTableHeader[];
  data: any[];
  hasActions?: boolean;
  actions?: React.ReactNode;
}

function Table({ header, data, hasActions = false, actions }: TableProps) {
  return (
    <div className={styles.container}>
      <table cellSpacing="0" cellPadding="0">
        <TableHeader columns={header} />
        <TableBody
          keys={header}
          data={data}
          hasActions={hasActions}
          actions={actions}
        />
      </table>
    </div>
  );
}

export default Table;
