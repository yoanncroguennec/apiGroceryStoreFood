const Product = require('../models/Product')
// const createError = require('../../utils/error')


const productCtrl = {
    createProduct: async (req, res, next) => {
      const newProduct = new Product(req.body);

      try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
      } catch (err) {
        next(err);
      }
    },

    updateProduct: async (req, res, next) => {
      try {
        const updateProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateProduct);
      } catch (err) {
        next(err);
      }
    },

    deleteProduct: async (req, res, next) => {
      try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Le produit a était supprimé.");
      } catch (err) {
        next(err);
      }
    },

    getProduct: async (req, res, next) => {
      try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
      } catch (err) {
        next(err);
      }
    },

    getAllProducts: async (req, res, next) => {
      const { min, max, ...others } = req.query;
      try {
        const product = await Product.find({
          ...others,
          price: { $gt: min | 1, $lt: max || 999 },
        }).limit(req.query.limit);
        res.status(200).json(product);
      } catch (err) {
        next(err);
      }
    },


    // OTHERS FUNCTIONS
    countByType: async (req, res, next) => {
      try {
        const fruitsCount = await Product.countDocuments({ type: "fruits" });
        const vegetablesCount = await Product.countDocuments({ type: "legumes" });
        const freshProduceCount = await Product.countDocuments({ type: "produits frais" });
        const groceriesCount = await Product.countDocuments({ type: "epiceries" });
        const drinksCount = await Product.countDocuments({ type: "boissons" });

        res.status(200).json([
          { type: "FRUITS", count: fruitsCount },
          { type: "LEGUMES", count: vegetablesCount },
          { type: "PRODUITS FRAIS", count: freshProduceCount },
          { type: "EPICERIES", count: groceriesCount },
          { type: "BOISSONS", count: drinksCount },
        ]);
      } catch (err) {
        next(err);
      }
    }
}

module.exports = productCtrl