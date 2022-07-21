import React, {useEffect, useState} from 'react';
import {Row} from "./Row";
import axios from "axios";

const tableData = {
    tableName: 'Таблица пользователей',
    description: 'В данной таблице перечислены пользователи, которых я подгрузил с сервера',
    structure: ['id', 'name', 'username', 'email'],
}

async function fetchUsers(dataTable, setData, setRequestCompleted) {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        const data = response.data
        const newData = Object.assign(dataTable, {data})
        setData(newData)
        setTimeout(() => {
            setRequestCompleted(true)
        }, 1000)
    } catch (e) {
        console.log(e.message)
    }
}


export const Table = () => {
    const [data, setData] = useState(tableData)
    const [requestCompleted, setRequestCompleted] = useState(false)

    function deleteRow(id) {
        const response = window.confirm('Вы хотите удалить эту строку?');
        if (response) {
            const newData = JSON.parse(JSON.stringify(data))
            newData.data = newData.data.filter(item => item.id !== id)
            setData(newData)
        }
    }

    useEffect(() => {
        fetchUsers(data, setData, setRequestCompleted)
    }, [])


    return (
        <>
            {!requestCompleted
                ?
                <div className="lds-dual-ring"></div>
                :
                <>
                    <div className={"table_name"}>
                        <h2>
                            {data.tableName}
                        </h2>
                    </div>
                    <div className={"table_description"}>
                        <p>
                            {data.description}
                        </p>
                    </div>
                    <div className={"table_header"}>
                        {data.structure.map(item => <div key={item}>{item}</div>)}
                    </div>
                    <div className={"table_body"}>
                        {data.data.map(item => <Row
                            key={item.id}
                            row={item}
                            deleteRow={deleteRow}
                        />)}
                    </div>
                </>

            }
        </>

    );
};

