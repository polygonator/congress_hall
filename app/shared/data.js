export const externalLinkOptions = { // eslint-disable-line import/prefer-default-export
	rel: 'noopener noreferrer',
	target: '_blank'
};

export const facebookShare = {
	icon: 'facebook',
	code: 'facebook',
	url: '//www.facebook.com/sharer/sharer.php?u=',
	title: 'facebook-share-dialog'
};

export const twitterShare = {
	icon: 'twitter',
	code: 'twitter',
	url: '//twitter.com/share?url=',
	custom_text: '//twitter.com/share?text=',
	title: 'twitter-share-dialog'
};

export const shares = [facebookShare, twitterShare];

/* TODO update bps when create new project */
export const mediaBPs = {
	bp1: 'screen and (max-width: 767px)',
	bp2: 'screen and (min-width: 768px) and (max-width: 1023px)',
	bp3: 'screen and (min-width: 1024px) and (max-width: 1279px)',
	bp4: 'screen and (min-width: 1280px) and (max-width: 1439px)',
	bp5: 'screen and (min-width: 1440px) and (max-width: 1919px)',
	bp6: 'screen and (min-width: 1920px)'
};

export const mainNavigation = [
	{
		url: '/',
		title: 'главная'
	},
	{
		url: '/config',
		title: 'конфигуратор'
	},
	{
		url: '/blog',
		title: 'блог'
	},
	{
		url: '/contacts',
		title: 'контакты'
	}
];
export const langButton = [
	{
		id: 1,
		title: 'ru'
	},
	{
		id: 2,
		title: 'eng'
	},
	{
		id: 3,
		title: 'ger'
	},
	{
		id: 4,
		title: 'fr'
	},
	{
		id: 5,
		title: 'sp'
	},
	{
		id: 6,
		title: 'chi'
	},
	{
		id: 7,
		title: 'jap'
	}
];
