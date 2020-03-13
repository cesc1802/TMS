import React from "react";
import { Table, Button, Pagination, Row, Col } from "antd";

const TableWrapper = props => {
    const {
        dataSource,
        columns,
        pages,
        onRow,
        showModal,
        rowSelection,
        onDeleteRows
    } = props;
    return (
        <React.Fragment>
            <Button
                onClick={showModal}
                type="primary"
                style={{ marginBottom: 16, marginRight: 8 }}
            >
                Add
            </Button>
            <Button
                onClick={onDeleteRows}
                type="primary"
                style={{ marginBottom: 16, marginRight: 8 }}
            >
                Delete
            </Button>

            <Table
                className="tms-table-content"
                tableLayout="fixed"
                dataSource={dataSource}
                bordered
                columns={columns}
                onRow={onRow}
                pagination={false}
                rowSelection={rowSelection}
            />
            <br />
            {pages && (
                <Pagination
                    total={pages.total}
                    pageSize={pages.pageSize}
                    onChange={pages.onChange}
                />
            )}
        </React.Fragment>
    );
};
export default TableWrapper;
