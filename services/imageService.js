const Image = require('../models/Image');

const imageService = {

  async markAsFavorite(username, imageUrl) {
    try {
      const existingImage = await Image.findOne({ username, url: imageUrl });
      if (existingImage) {
        throw new Error('Image already marked as favorite');
      }
      const image = new Image({ username, url: imageUrl, favorite: true });
      await image.save();
      return image;
    } catch (error) {
      throw new Error('Error marking image as favorite: ' + error.message);
    }
  },


  async getFavorites(username) {
    try {
      const favorites = await Image.find({ username, favorite: true });
      if (!favorites.length) {
        throw new Error('No favorite images found for this user');
      }
      return favorites;
    } catch (error) {
      throw new Error('Error fetching favorite images: ' + error.message);
    }
  },


  async unmarkFavorite(username, imageUrl) {
    try {
      const image = await Image.findOne({ username, url: imageUrl });
      if (!image) {
        throw new Error('Image not found');
      }
      return true;
    } catch (error) {
      throw new Error('Error unmarking image as favorite: ' + error.message);
    }
  },


  async updateFavorite(username, imageUrl) {
    try {
      const image = await Image.findOne({ username, url: imageUrl });
      if (!image) {
        throw new Error('Image not found');
      }
      image.favorite = true;
      await image.save();
      return image;
    } catch (error) {
      throw new Error('Error updating image as favorite: ' + error.message);
    }
  },
};

module.exports = imageService;
