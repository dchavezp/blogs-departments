import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableActions from "@/components/Table/TableActions";
import UserForm from "@/components/UserForm";
import withAuth from "@/hoc/withAuth";
import useUserInfoSuscription from "@/hooks/useUserInfoSuscription";
import { getUsers } from "@/services/user.service";
import { DataTableHeader } from "@/types";
import { useState } from "react";
function AdminPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const headerColumns: DataTableHeader[] = [
    { key: "username", value: "Usuario" },
    { key: "password", value: "Contraseña" },
    { key: "role", value: "Rol" },
    { key: "department", value: "Departamento" },
    { key: "actions", value: "Acciones" },
  ];
  const [query, setQuery] = useState<string>("");
  const { data, error, isLoading } = getUsers(currentPage - 1, query);
  const [modal, setModal] = useState<boolean>(false);
  const limitPerPage: number = 4;
  const showModal = () => {
    setModal(true);
  };
  const { userInfo } = useUserInfoSuscription();
  const [edit, setEdit] = useState<boolean>(false);
  const handleEdit = () => {
    setModal(true);
    setEdit(true);
  };
  const handleCancel = () => {
    setModal(false);
    setEdit(false);
  };
  return (
    <>
      <Modal active={modal} setActive={setModal}>
        <UserForm cancel={handleCancel} isEdit={edit} user={userInfo} />
      </Modal>
      <Layout mainAction={showModal} query={query} setQuery={setQuery}>
        {isLoading ? (
          <div>Cargando datos...</div>
        ) : (
          <>
            {!error ? (
              <>
                <Table
                  data={data.slice(
                    (currentPage - 1) * limitPerPage,
                    currentPage * limitPerPage
                  )}
                  header={headerColumns}
                  hasActions
                  actions={<TableActions onClick={handleEdit} />}
                />
                <Pagination
                  currentPage={currentPage}
                  onPageChange={(page: any) => {
                    setCurrentPage(page);
                  }}
                  totalCount={data.length || 0}
                  siblingCount={1}
                  pageSize={limitPerPage}
                />
              </>
            ) : (
              <div>Ocurrió un error al traer la data</div>
            )}
          </>
        )}
      </Layout>
    </>
  );
}

export default withAuth(AdminPage);
