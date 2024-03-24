import Listing from '../models/listingModel.js'
import { errorHandler } from '../utils/error.js';
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

export const updateListing=async (req, res, next) => {
  try{
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404,'Room not found'));
    }
     // Check if the user is the owner of the listing
     if (listing.userData !== req.user.id) {
      return next(errorHandler(401,'You are not authorized to perform this action'));
    }
    const response=await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(response)
  }catch(error){
    next(error);
  }
}

export const getListing=async (req, res, next) => {
  try{
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404,'Room Not found'));
    res.status(200).json(listing);
  }catch(error){
    next(error);
  }
}