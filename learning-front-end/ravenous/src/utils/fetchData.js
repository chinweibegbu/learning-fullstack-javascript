const yelpApiKey = "clktFjyDAgfyu3zC5Fd2r1K724KCgMlS-CgpitkL41u6eR77Y3ktkP4xUaUv1ZXP4sNAD9XAJsTGYPyXRuDnGNYilS1EAuGSX8Tvhxnafyhrd1YK8K3vNUpcOBi8ZHYx";
const yelpBaseUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3";
// NOTE: Visit https://cors-anywhere.herokuapp.com/corsdemo for CORS demo renewal

const getBusinesses = async (searchTerm, location, sortBy) => {
    const businessRequestEndpoint = "/businesses/search";
    const requestParams = `?term=${searchTerm}&location=${location}&sort_by=${sortBy}`;
    const urlToFetch = yelpBaseUrl + businessRequestEndpoint + requestParams;

    try {
        const response = await fetch(urlToFetch, {
            headers: {
                'Authorization': `Bearer ${yelpApiKey}`,
                'accept': 'application/json'
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const businessData = jsonResponse.businesses.map((business) => {
                return {
                    image: business.image_url,
                    name: business.name,
                    address: {
                        addressLine: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        postalCode: business.location.zip_code
                    },
                    category: business.categories[0],
                    rating: business.rating,
                    reviewCount: business.review_count
                }
            });
            return businessData;
        } else {
            return [];
        }
    } catch (e) {
        console.log(e);
    }
};

export default getBusinesses;