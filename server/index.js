const express = require('express');
const admin = require('firebase-admin');

const account = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(account),
});

const db = admin.firestore();

const app = express();

const port = process.env.PORT || 3000;

app.get('/posts', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  db.collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => {
      const posts = [];

      snapshot.forEach((document) => {
        posts.push({
          id: document.id,
          ...document.data(),
        });
      });

      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(port);
