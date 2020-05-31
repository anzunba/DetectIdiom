import React, {useState} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const difficulties_arr = [ 'None', 'Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native' ];
const List = ({parentCallback}) => {
    function list_item(difficulty, index) {
        return (
            <MenuItem key={index} onClick={()=>parentCallback(difficulty)}>
                {difficulty}
            </MenuItem>
        );
    }
    const listItems = difficulties_arr.map((difficulty, index) => list_item(difficulty, index));
	return <FormControl>{listItems}</FormControl>;
}

export default List;
