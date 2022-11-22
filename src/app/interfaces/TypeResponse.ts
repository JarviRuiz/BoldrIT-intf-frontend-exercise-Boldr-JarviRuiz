
export interface Type {
	id: string;
	label:string;
}

export interface Message {
	items: Type[]
}

export interface TypeResponse{
	message: Message
}