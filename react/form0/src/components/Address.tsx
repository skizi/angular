import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

import { PROFILE } from "../domain/services/profile";
import useStyles from "./styles";

import { RootState } from "../domain/entity/rootState";
import { Address as IAddress } from "../domain/entity/address";
import profileActions from "../store/profile/actions";

import { isPostalcode } from "../domain/services/address";

import { searchAddressFromPostalcode } from "../store/profile/effects";

import { Profile } from "../domain/entity/profile";
import { calculateValidation } from "../domain/services/validation";
import validationActions from "../store/validation/actions";


type Props = {
	postalcode:string;
	changePostalcode:( postalcode:string ) => void;
	prefecture:string;
	changePrefecture:( prefecture:string ) => void;
	city:string;
	changeCity:( city:string ) => void;
	restAddress:string;
	changeRestAddress:( restAddress:string ) => void;
}


const Address:React.FC<Props> = ( props:Props ) => {

	const dispatch = useDispatch();
	const profile = useSelector( (state:RootState)=> state.profile );

  	const classes = useStyles();


  	const handleAddressChange = (member:Partial<IAddress>) => {
  		dispatch(profileActions.setAddress(  member ));
	    recalculateValidation({ address: { ...profile.address, ...member } });
  	}


	const handlePostalcodeChange = (code: string) => {
		if (!isPostalcode( code )) return; // エラーになるのでコードには転写しないでください。

		props.changePostalcode( code );

	    dispatch(searchAddressFromPostalcode(code));

	    recalculateValidation({
	      address: { ...profile.address, postalcode: code }
	    });
	};


	const recalculateValidation = (member: Partial<Profile>) => {
	    if (!validation.isStartValidation) return;

	    const newProfile = {
	      ...profile,
	      ...member
	    };
	    const message = calculateValidation(newProfile);
	    dispatch(validationActions.setValidation(message));
	};

	const validation = useSelector((state: RootState) => state.validation);
  

	return(
		<>
			<TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.POSTALCODE} onChange={e=>handlePostalcodeChange( e.target.value )}
	        required
	        error={!!validation.message.address.postalcode}
	        helperText={validation.message.address.postalcode} />
			<TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.PREFECTURE} value={props.prefecture} onChange={e=>handleAddressChange( { prefecture:e.target.value } )}
	        required
	        error={!!validation.message.address.prefecture}
	        helperText={validation.message.address.prefecture} />
			<TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.CITY} value={props.city} onChange={e=>handleAddressChange( { city:e.target.value } )}
	        required
	        error={!!validation.message.address.city}
	        helperText={validation.message.address.city} />
			<TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.RESTADDRESS} value={props.restAddress} onChange={e=>props.changeRestAddress( e.target.value )}
	        error={!!validation.message.address.restAddress}
	        helperText={validation.message.address.restAddress} />
		</>
	);

}


export default Address;