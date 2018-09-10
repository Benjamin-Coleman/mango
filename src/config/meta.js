export const baseUrl = 'https://inkmango.com';
export const baseAssetUrl = 'https://cms.inkmango.com';
export const baseFeedUrl = `${baseAssetUrl}/feed`;

export const meta = {
    inkmango: {
        badgeUrl: '/public/svg/inkmango.svg',
        link: '/',
        title: 'inkmango',
        description: 'Inkmango meta description',
        favicon: '/public/images/favicon.ico',
        openGraphImage: 'og404',
        iconUrl: '404',
        shortDescription: 'short desc',
        twitterName: 'inkmango',
        themeColor: '#000000',
        manifest: '/public/meta/manifest.json',
    },
};

// Extend each edition with defaults
Object.keys(meta).forEach(key => meta[key] = Object.assign({}, meta.inkmango, meta[key]));

export default meta.inkmango;
