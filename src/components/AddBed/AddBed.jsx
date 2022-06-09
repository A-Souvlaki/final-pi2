import React, { useState, useContext } from 'react';
import './AddBed.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {  useFormik } from 'formik';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import AppContext from "../../store/AppContext";
import { useSelector } from "react-redux";


const AddBed = () => {
	const state = useContext(AppContext);
	
	const clinics= state.ipss

	const [ips, setIps] = useState(null);

	const handleSelect = (event, value) => {
		setIps(clinics.find((element) => element.ipsName === value));
		
	};

	const { user: currentUser } = useSelector((state) => state.auth);

	const configurated = {
		headers: { Authorization: `Bearer ${currentUser.accessToken}` }
	};



	const load = async (info) => {
		try {
			 const response = await axios.put('http://localhost:8080/crueapi/' +ips.ipsId +'/beds/update-beds?personId=' +ips.ipsId,
				info,
				configurated
			);
			console.log(response)
		} catch (error) {}
	};
	const formik = useFormik({
		initialValues: {
			dayupIcubedsdesabled: '',
			dayupNicubedsdesabled: '',
			dayupPicubedsdesabled: '',
		},

		onSubmit: (info) => {
			const parse = []
			parse.push(info)
			load(parse);
		},
	});

	return (
		<React.Fragment>
			<header className="panelSuperior">
				<h2>Disponibilidad de camas UCI</h2>
			</header>
			<Box >
				<form onSubmit={formik.handleSubmit}>
					<div>
						<Box sx={{ minWidth: 120 }}>
							<InputLabel id="simple-select">IPS</InputLabel>
							<Autocomplete  
                			  onChange={(event, value) => handleSelect(event, value)}   
							  label="IPS"
							  size="small"
                			  id="combo-box-demo"
                			  options={clinics.map(ip => ip.ipsName )}
                			  sx={{ width: 300, mb: 2 }}
                			  renderInput={(params, index) => 
                			    <TextField {...params} 
                			      label="Buscar IPS" 
                			    />}
                			/>
						</Box>
					</div>
					<div className="labelText">
						<label className="labels" size="small" htmlFor="">
							¿Cuantas camas libres (DISPONIBLES) tiene en UCI
							ADULTO para COVID-19?
						</label>
						<Box
							sx={{
								'& > :not(style)': { m: 1, width: '15ch' },
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								id="dayupIcubedsdesabled"
								label="Cantidad"
								variant="outlined"
								size="small"
								name="dayupIcubedsdesabled"
								onChange={formik.handleChange}
								value={formik.values.adulto}
							/>
						</Box>
					</div>

					<div className="labelText">
						<label className="labels" size="small" htmlFor="">
							¿Cuantas camas libres (DISPONIBLES) tiene en UCI
							PEDIATRIA para COVID-19?
						</label>
						<Box
							sx={{
								'& > :not(style)': { m: 1, width: '15ch' },
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								id="dayupPicubedsdesabled"
								label="Cantidad"
								variant="outlined"
								size="small"
								name="dayupPicubedsdesabled"
								onChange={formik.handleChange}
								value={formik.values.pediatria}
							/>
						</Box>
					</div>

					<div className="labelText">
						<label className="labels" size="small" htmlFor="">
							¿Cuantas camas libres (DISPONIBLES) tiene en UCI
							NEONATAL para COVID-19?
						</label>
						<Box
							sx={{
								'& > :not(style)': { m: 1, width: '15ch' },
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								id="dayupNicubedsdesabled"
								label="Cantidad"
								variant="outlined"
								size="small"
								name="dayupNicubedsdesabled"
								onChange={formik.handleChange}
								value={formik.values.neonatal}
							/>
						</Box>
					</div>

					<div>
						<Button
							variant="contained"
							color="primary"
							type="submit"
						>
							Agregar
						</Button>
					</div>
				</form>
			</Box>
		</React.Fragment>
	);
};

export default AddBed;
