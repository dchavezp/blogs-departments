import { DataTableHeader } from "@/types";
import styles from "./table-header.module.css";
interface TableHeaderProps {
  columns: DataTableHeader[];
}

function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead className={styles.container}>
      <tr>
        {columns.map((item) => {
          return (
            <th key={item.key} className={styles.column}>
              <div>{item.value}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
