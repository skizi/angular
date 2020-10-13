import React from "react";
import {User} from "~/store/user/actions";


type Props = {
	users:User[]
}


const UserList:React.FC = ( props:Props ) => {
	
	console.log("UserList component render----------------");

	return(
		<>
			<h3>ユーザー一覧</h3>
			<ul>
			{(()=>{
				return props.users.map(( item, i ) => {
					return (<li key={i}>name:{item.name} outline:{item.outline} id:{item.id}</li>);
				})
			})()}
			</ul>
		</>
	);

};


export default UserList;