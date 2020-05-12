import React from 'react';

const SearchBox = ({value,onChange}) => {
    return ( 
        <input
        type ="text"
        name="query"
        // my-3 m= margin y= y-axis or top and bottom 3 = numbder space margin.
        className="form-control my-3"
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        />
     );
}
 
export default SearchBox;

