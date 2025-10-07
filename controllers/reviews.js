const Listing = require("../Models/listing");
const Review = require("../Models/review");

module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview); // Pushing ObjectId reference

  await newReview.save();
  await listing.save();
  req.flash("success", "New Review created !");
  res.redirect(`/listings/${listing._id}`); // ✅ Better UX
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  await Review.findByIdAndDelete(reviewId);
  req.flash("success", " Review Deleted");
  res.redirect(`/listings/${id}`);
};
