export interface Author {
	family?: string;
	given?: string;
}



export interface Work {
	author?: Author[];
	title?: string[];
	type?: string;
	URL?: string;
	DOI?: string;
	published?: any;
	publisher?: string;
}

export interface Message {
	items: Work[]
}

export interface WorkResponse{
	message: Message
}