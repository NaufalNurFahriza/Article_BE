const express = require('express');
const articleController = require('../controllers/article.controller');
const { verifyToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);

// Protected routes -admin only
router.post('/', verifyToken, articleController.createArticle);
router.put('/:id', verifyToken, articleController.updateArticle);
router.delete('/:id', verifyToken, articleController.deleteArticle);

module.exports = router;