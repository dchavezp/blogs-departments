import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableActions from "@/components/Table/TableActions";
import withAuth from "@/hoc/withAuth";
import { DataTableHeader } from "@/types";
import React, { useState } from "react";

function BloggerPage() {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([
    {
      id: "id1",
      content: "test",
      user: "asdasd1",
      createdAt: "2023-02-25T14:22:02.702Z",
    },
    {
      id: "id2",
      content: "test2",
      user: "asdasd1",
      createdAt: "2023-02-25T14:22:02.702Z",
    },
    {
      id: "id3",
      content: "test3",
      user: "asdasd1",
      createdAt: "2023-02-25T14:22:02.702Z",
    },
    {
      id: "id4",
      content: "test4",
      user: "asdasd1",
      createdAt: "2023-02-25T14:22:02.702Z",
    },
    {
      id: "id5",
      content: "test5",
      user: "asdasd1",
      createdAt: "2023-02-25T14:22:02.702Z",
    },
    {
      id: "id6",
      content: "test6",
      user: "asdasd1",
      createdAt: "2023-02-25T14:22:02.702Z",
    },
    {
      id: "id7",
      content: "test7",
      user: "asdasd1",
      createdAt: "2023-02-25T14:22:02.702Z",
    },
  ]);
  const headerColumns: DataTableHeader[] = [
    { key: "user", value: "Usuario" },
    { key: "content", value: "Cotenenido" },
    { key: "createdAt", value: "Fecha de Creacion" },
    { key: "actions", value: "Acciones" },
  ];
  return (
    <Layout mainAction={() => {}} query={query} setQuery={setQuery}>
      <Table
        data={data.slice((currentPage - 1) * 3, currentPage * 3)}
        header={headerColumns}
        hasActions
        actions={<TableActions />}
      />
      <Pagination
        currentPage={currentPage}
        onPageChange={(page: any) => {
          setCurrentPage(page);
        }}
        totalCount={data.length || 0}
        siblingCount={1}
        pageSize={3}
      />
    </Layout>
  );
}

export default withAuth(BloggerPage);
