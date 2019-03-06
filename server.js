import Express from 'express';

const app = Express();

app.get('/', (_, res) => res.send('Hello World!'));

app.listen(3214, () => console.log('Init!!'));
