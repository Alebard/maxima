import './App.css';
import {Table} from "./components/Table";
import {useState} from "react";

function App() {
    const [createTable, setCreateTable] = useState(false);



    return (
        <>
            {createTable
                ? <Table />
                : <button onClick={() => setCreateTable(true)}>Создать таблицу</button>
            }
        </>
    );
}

export default App;
