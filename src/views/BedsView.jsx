import React, { useState, useEffect, useContext } from "react";
import axios from 'axios'
import AddBedContainer from '../components/AddBed/AddBedContainer';
import AddBed from '../components/AddBed/AddBed';
import AppContext from '../store/AppContext';
import BedIcon from '@mui/icons-material/Bed';
import PatientPopUp from '../components/AEVpatients/PatientPopUp/PatientPopUp';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";

const BedsView = () => {
	const state = useContext(AppContext);
	const { user: currentUser } = useSelector((state) => state.auth);

	const configurated = {
		headers: { Authorization: `Bearer ${currentUser.accessToken}` }
	};

	const [openPopUp, setOpen] = useState(false)

	const loadIPS = async () => {
		try {
			const response = await axios.get(
				'http://localhost:8080/crueapi/crue/get-all-ips', configurated
			);
			const ips = response.data;
			state.setIPS(ips);
		} catch (error) { }
	};

	useEffect(() => {
		loadIPS();
	}, []);

	return (
		<div align="center">
			<Card className="text-center">
				<Card.Header>Información Camas UCI</Card.Header>
				<Card.Body>
					<Card.Text>
						Seleccione el botón de abajo para actualizar la información de las camas UCI.
					</Card.Text>
					<Button variant="primary" onClick={() => { setOpen(true) }}>Cambiar Información</Button>
				</Card.Body>

			</Card>
			<PatientPopUp
				openPopup={openPopUp}
				setOpenPopup={setOpen}
				title={'Información camas UCI'}
			>
				<AddBed/>
			</PatientPopUp>
		</div>
	);
};

export default BedsView;
