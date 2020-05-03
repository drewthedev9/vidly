import React from 'react';
import Tableheader from './tableHeader';
import TableBody from './tableBody';


const Table = ({columns, sortColumn, onSort,data}) => {
  
    return ( 

        <table className ='table'>
        <Tableheader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        />
        <TableBody
        columns={columns}
        data={data}
        
        />
        
       
    </table>
     );
}
 
export  default  Table;