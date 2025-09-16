import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: 'id27d31g', // You can find this in sanity-studio/sanity.json
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-03-25',
});