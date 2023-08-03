import * as React from 'react';
import {useState} from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';

export default function FormSelect({type, size, single, max = 10, defaultValue='', dropDown=[], onValueChange = () => {}}) {
  const [age, setAge] = React.useState('');
  const [categories, setCategories] = useState(defaultValue || []);

  const handleChangeSingle = (event) => {
    setCategories(event.target.value);
    onValueChange(event.target.value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleChangeMultiple = (event) => {
    const {
      target: { value },
    } = event;
    
    if(value.length <= max){
      setCategories(typeof value === "string" ? value.split(",") : value);
      onValueChange(value);
    }
    
  };

  const handleFilter=()=>{

  }
  return (
    <div className='p-2 w-full'>
      <div className='text-black w-full'>

    <FormControl className="w-full">
    <InputLabel size={"small".localeCompare(size) == 0 ? "small" : ""}>
            {type}
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple={single ? false : true}
            value={categories}
            defaultValue={defaultValue || (single ? '' : [])}
            onChange={single ? handleChangeSingle : handleChangeMultiple}
            input={<OutlinedInput label={`${type}`} />}
            MenuProps={MenuProps}
            size={"small".localeCompare(size) == 0 ? "small" : ""}
          >
            {dropDown && dropDown.map((name) => ( 
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          
        </FormControl>
      </div>
    </div>
  );
}
