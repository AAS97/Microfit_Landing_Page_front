const environment = process.env.ENVIRONMENT || 'development';
console.log(environment);

const urls = {
    development: { url: 'http://localhost:3001/crud' },
    production: { url: 'https://desolate-sierra-46845.herokuapp.com/crud' }
};

export default urls[environment].url;