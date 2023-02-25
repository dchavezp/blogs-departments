import styles from "./table-actions.module.css";
interface TableActionsProps extends React.ComponentProps<"div"> {}
function TableActions({ ...props }: TableActionsProps) {
  return (
    <div className={styles.container} {...props}>
      Editar
    </div>
  );
}

export default TableActions;
