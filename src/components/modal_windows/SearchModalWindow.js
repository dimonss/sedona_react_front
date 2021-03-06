import React, {useCallback, useState} from "react";
import "./search_modal_window.scss";
import ModalWinodow from "../reusable/modalWindow/ModalWindow";
import stringsRU from "../../strings/stringsRU";
import xIcon from "../../images/button/X.svg";
import {useDispatch, useSelector} from "react-redux";
import {toggleModalWindow} from "../../store/actions/uiActions";
import TextField from "@mui/material/TextField";
import {DesktopDatePicker} from "@mui/lab";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";
import urls from "../../urls";

const SearchModalWindow = () => {
	const modalWindowIsOpen = useSelector((store) => store?.ui?.modalWindowIsOpen);
	const dispatch = useDispatch();
	const dispatchCloseModalWindow = useCallback(() => dispatch(toggleModalWindow(false)), [dispatch]);
	const navigate = useNavigate();
	const getResult = useCallback(() => {
		navigate(urls.HOTELS, { state: { arrival_data, departure_data, amountOfAdults, amountOfChildren } });
		dispatchCloseModalWindow();
	}, []);
	const [arrival_data, setArrival_data] = useState(new Date());
	const [departure_data, setDeparture_data] = useState(new Date());
	const [amountOfAdults, setAmountOfAdults] = React.useState(2);
	const [amountOfChildren, setAmountOfChildren] = React.useState(0);

	return (
		// <ModalWinodow isOpen={modalWindowIsOpen} setIsOpen={dispatchCloseModalWindow}>
		<ModalWinodow isOpen={modalWindowIsOpen} setIsOpen={() => {}}>
			<div className="search-modal-window">
				<div className="search-modal-window__button__close" onClick={dispatchCloseModalWindow}>
					<img src={xIcon} alt="Close" />
				</div>
				<div className="search-modal-window__inner">
					<div className="search-modal-window__title">{stringsRU.search_hotel_sedona}</div>
					<div className="search-modal-window__inputs-container">
						<DesktopDatePicker
							label={stringsRU.arrival_data}
							value={arrival_data}
							minDate={new Date("2017-01-01")}
							onChange={(newValue) => {
								setArrival_data(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
							date={}
							rawValue={}
						 openPicker={}/>
						<DesktopDatePicker
							label={stringsRU.departure_data}
							value={departure_data}
							minDate={new Date("2017-01-01")}
							onChange={(newValue) => {
								setDeparture_data(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
							date={}
							rawValue={}
							openPicker={}
						/>
						<div className="search-modal-window__container__amount-selectors">
							<FormControl sx={{ m: 1, minWidth: 80 }}>
								<InputLabel id="demo-simple-select-autowidth-label">{stringsRU.adults}</InputLabel>
								<Select
									labelId="demo-simple-select-autowidth-label"
									id="demo-simple-select-autowidth"
									value={amountOfAdults}
									onChange={(e) => setAmountOfAdults(e.target.value)}
									autoWidth
									label={stringsRU.adults}
								>
									{Array.from(Array(10).keys()).map((item, index) => (
										<MenuItem key={index} value={item}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl sx={{ m: 1, minWidth: 80 }}>
								<InputLabel id="demo-simple-select-autowidth-label">{stringsRU.children}</InputLabel>
								<Select
									labelId="demo-simple-select-autowidth-label"
									id="demo-simple-select-autowidth"
									value={amountOfChildren}
									onChange={(e) => setAmountOfChildren(e.target.value)}
									autoWidth
									label={stringsRU.children}
								>
									{Array.from(Array(10).keys()).map((item, index) => (
										<MenuItem key={index} value={item}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					</div>
					<div className="search-modal-window__button__submit" onClick={getResult}>
						{stringsRU.find}
					</div>
				</div>
			</div>
		</ModalWinodow>
	);
};

export default SearchModalWindow;
