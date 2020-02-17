export interface IEmail {
	id: string;
	date: Date;
	from: {
		name: string;
		address: string;
		domain: string;
	};
	to: {
		name: string;
		address: string;
	}[];
}
