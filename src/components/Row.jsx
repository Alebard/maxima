import React from 'react';



export const Row = ({row, deleteRow }) => {
    return (
        <div className={"table_row"} onClick={() => deleteRow(row.id)}>
            <div>{row.id}</div>
            <div>{row.name}</div>
            <div>{row.username}</div>
            <div>{row.email}</div>
        </div>
    );
};

