export interface IGifListData {
	data?: any,
	pagination?: {
		total_count: number,
		count: number,
		offset: number
	},
	meta?: {
		status: number,
		msg: string,
		response_id: string
	}
}

export interface IGifData {
	analytics: {}
	analytics_response_payload: string,
	bitly_gif_url: string,
	bitly_url: string,
	content_url: string,
	embed_url: string,
	id: string,
	images: {},
	import_datetime: string,
	is_sticker: number,
	rating: string,
	slug: string,
	source: string,
	source_post_url: string,
	source_tld: string,
	title: string,
	trending_datetime: string,
	type: string,
	url: string,
	user: {},
	username: string,
}