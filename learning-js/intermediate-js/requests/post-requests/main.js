// Information to reach API
/*
    NOTE: This apiKey was created by creating an account on Rebrandly,
            going to the Account menu, and generating an API key. I
            created the account with my Google account. See this link:
            https://www.codecademy.com/article/rebrandly-signup
*/
const apiKey = '935c47b832fe457cbf53437d4891bc56';     
const url = 'https://api.rebrandly.com/v1/links';

// Some page elements
const inputField = document.querySelector('#input');
const shortenButton = document.querySelector('#shorten');
const responseField = document.querySelector('#responseField');

// Asynchronous functions
const shortenUrl = () => {
  const urlToShorten = inputField.value;
  const data = JSON.stringify({destination: urlToShorten});
  
	fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'apikey': apiKey
    },
    body: data
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, (networkError) => {
    console.log(networkError.message);
  })
  .then((jsonResponse) => {
    renderResponse(jsonResponse);
  })
}

// Clear page and call Asynchronous functions
const displayShortUrl = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  shortenUrl();
}

shortenButton.addEventListener('click', displayShortUrl);
