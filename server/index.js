/* eslint-disable no-shadow */

const express = require('express');
const admin = require('firebase-admin');
const Busboy = require('busboy');
const dotenv = require('dotenv');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { nanoid } = require('nanoid');

const account = require('./serviceAccountKey.json');

dotenv.config({
  path: path.resolve(process.cwd(), '.env.local'),
});

admin.initializeApp({
  credential: admin.credential.cert(account),
  storageBucket: process.env.STORAGE_BUCKET,
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

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
        posts.push(document.data());
      });

      res.json(posts);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.post('/posts', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const busboy = new Busboy({ headers: req.headers });

  const fields = new Map();
  const fileDetails = new Map();

  busboy.on('file', (fieldName, file, fileName, encoding, mimetype) => {
    const filePath = path.join(os.tmpdir(), fileName);

    file.pipe(fs.createWriteStream(filePath));

    fileDetails.set('filePath', filePath);
    fileDetails.set('mimetype', mimetype);
  });

  busboy.on('field', (fieldName, value) => {
    fields.set(fieldName, value);
  });

  busboy.on('finish', () => {
    const token = nanoid();

    bucket.upload(
      fileDetails.get('filePath'),
      {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: fileDetails.get('mimetype'),
            firebaseStorageDownloadTokens: token,
          },
        },
      },
      (error, uploadedFile) => {
        if (error) {
          res.status(500).json({ error });
          return;
        }

        const data = Object.fromEntries(fields);

        const post = {
          ...data,
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${token}`,
          createdAt: parseInt(data.createdAt, 10),
        };

        db.collection('posts').doc(post.id).set(post)
          .then(() => res.status(201).json({ message: 'Post added' }))
          .catch((error) => res.status(500).json({ error }));
      },
    );
  });

  req.pipe(busboy);
});

app.listen(port);
