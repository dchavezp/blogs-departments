import styles from "./row-table.module.css";
interface RowTableProps {
  children?: React.ReactNode;
}

function RowTable({ children }: RowTableProps) {
  return <tr className={styles.container}>{children}</tr>;
}

export default RowTable;
