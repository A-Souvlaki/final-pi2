import React from 'react'
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Checkbox, FormControlLabel } from '@mui/material';

export default function CheckBox(props) {
    const {name, label, onChange, section, error=null } = props;
    const [checkedOption, setChecked] = React.useState(false);

    const convertToDeEventPara = (value, name) =>({
		target :{
			value,
			section,
			name
		}
	})

    const handleOnChange = (event, name) => {
        setChecked(event.target.checked);
        if(checkedOption === true){
            onChange(convertToDeEventPara('N', name))
        }else{
            onChange(convertToDeEventPara('Y', name))
        }
        
    }

    return (
        <FormControl sx={{marginLeft:2, marginTop:1 ,width:'90%'}}
			{...(error && {error:true})}>
				<FormControlLabel control={<Checkbox />} name={name} checked={checkedOption} label={label} onChange={(event) => handleOnChange(event, name)}/>
				{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
    )
}
