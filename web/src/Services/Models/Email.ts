export interface IEmail {
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
