const { Op } = require('sequelize');
const { Article, User, Category } = require('../models');

exports.getAllArticles = async (req, res) => {
  try {
    const {
      articleId,
      userId,
      title,
      category,
      startDate,
      endDate,
      sortBy,
      sortOrder
    } = req.query;

    // Build filter conditions
    const whereConditions = {};
    
    if (articleId) {
      whereConditions.id = articleId;
    }
    
    if (userId) {
      whereConditions.userId = userId;
    }
    
    if (title) {
      whereConditions.title = { [Op.iLike]: `%${title}%` };
    }
    
    if (category) {
      whereConditions.categoryId = category;
    }
    
    if (startDate || endDate) {
      whereConditions.createdAt = {};
      
      if (startDate) {
        whereConditions.createdAt[Op.gte] = new Date(startDate);
      }
      
      if (endDate) {
        whereConditions.createdAt[Op.lte] = new Date(endDate);
      }
    }
    
    // Build sorting options
    let order = [['createdAt', 'DESC']]; // Default sorting
    
    if (sortBy && ['createdAt', 'title'].includes(sortBy)) {
      const direction = sortOrder === 'asc' ? 'ASC' : 'DESC';
      order = [[sortBy, direction]];
    }
    
    // For article length sorting
    if (sortBy === 'length') {
      order = [
        [sequelize.fn('LENGTH', sequelize.col('content')), 
        sortOrder === 'asc' ? 'ASC' : 'DESC']
      ];
    }
    
    const articles = await Article.findAll({
      where: whereConditions,
      order,
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: Category,
          attributes: ['id', 'name']
        }
      ]
    });
    
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: Category,
          attributes: ['id', 'name']
        }
      ]
    });
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    
    // Check if category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const newArticle = await Article.create({
      title,
      content,
      categoryId,
      userId: req.user.id
    });
    
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;
    const articleId = req.params.id;
    
    const article = await Article.findByPk(articleId);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Check if user is the owner or admin
    if (article.userId !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to update this article' });
    }
    
    // Check if category exists if provided
    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
    }
    
    await article.update({
      title: title || article.title,
      content: content || article.content,
      categoryId: categoryId || article.categoryId
    });
    
    res.status(200).json({
      message: 'Article updated successfully',
      article
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;
    
    const article = await Article.findByPk(articleId);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Check if user is the owner or admin
    if (article.userId !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to delete this article' });
    }
    
    await article.destroy();
    
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};