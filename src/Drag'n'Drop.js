import {updateColumnId} from './cards1' ;
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8089/", { transports: ["websocket"] });



export function dragStart(event){
let idColumnBefore = +event.currentTarget.closest('[data-column]').getAttribute('data-column');
let targetIdCard = event.target.getAttribute('data-card');
let object = JSON.stringify({
        idColumn:idColumnBefore,
        targetId:targetIdCard
});
    event.dataTransfer.setData("object", object);
		
}
export function dragOver(event){
	event.preventDefault();
}

export async function onDrop(event){
	event.preventDefault();
			
		let targetColumn= +event.target.closest('[data-column]').getAttribute('data-column');
		let data = JSON.parse(event.dataTransfer.getData("object"));
			if(data.idColumn != targetColumn){
				let cardFromSetData = document.querySelector(`[data-card="${data.targetId}`);
				socket.emit("move",{
					cardId: data.targetId,
					editColumn:targetColumn
				})
				// if(response.status ===200){
					this.append(cardFromSetData);
				// };
			};
			// if(data.idColumn != targetColumn){
			// 	let cardFromSetData = document.querySelector(`[data-card="${data.targetId}`);
			// 	let response = await updateColumnId(data.targetId, targetColumn);
			// 	if(response.status ===200){
			// 		this.append(cardFromSetData);
			// 	};
			// };
		}