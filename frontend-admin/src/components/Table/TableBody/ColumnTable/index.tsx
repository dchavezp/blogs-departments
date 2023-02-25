import styles from "./column-table.module.css";
interface ColumnTableProps {
  children?: React.ReactNode;
}
function ColumnTable({ children }: ColumnTableProps) {
  return (
    <td className={styles.container}>
      <div>{children}</div>
    </td>
  );
}

export default ColumnTable;
