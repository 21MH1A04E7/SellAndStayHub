import Listing from '../models/listingModel.js'
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Room not found' });
    }
    // Check if the user is the owner of the listing
    if (listing.userData !== req.user.id) {
      return res.status(401).json({ message: 'You can only delete your own rooms' });
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Room has been deleted' });
  } catch (error) {
    next(error);
  }
};