import { NextFunction, Request, Response } from "express";
import { MongooseQueryOptions, Types } from "mongoose";
import productModel from "../models/productModel";
import siteInfoModel from "../models/siteInfoModel";
import ApiError from "../utils/apiError";
import catchAsyncError from "../utils/error";

//------------------- ADMIN -------------------//

//create Product - admin
export const createProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productModel.create(req.body);

    //update the site information
    const siteInfo = await siteInfoModel.findById(1);
    if (siteInfo) {
      if (!siteInfo.categories.includes(req.body.category)) {
        siteInfo.categories.push(req.body.category);
      }
      siteInfo.totalProducts++;
      siteInfo.save();
    }
    res
      .status(200)
      .json({ success: true, product, categories: siteInfo?.categories });
  }
);

//update product - admin
export const updateProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const exists = await productModel.findById(req.params.productId);

    if (!exists) {
      return res
        .status(500)
        .json({ success: false, message: "Product not found" });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        returnOriginal: false,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true, product });
  }
);

//delete Product - admin
export const deleteProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productModel.findById(req.params.productId);
    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }
    //update the site information
    const siteInfo = await siteInfoModel.findById(1);
    if (siteInfo) {
      if (
        siteInfo.categories.filter((v) => v === product.category).length === 1
      ) {
        siteInfo.categories.splice(
          siteInfo.categories.indexOf(product.category),
          1
        );
      }
      siteInfo.totalProducts--;
      siteInfo.save();
    }
    await product.remove();
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  }
);

//------------------- ALL USERs -------------------//

//get a product
export const getProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productModel.findById(req.params.productId);

    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }
    res.status(200).json({ success: true, product });
  }
);

//get all categories
export const getAllCategories = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const siteInfo = await siteInfoModel.findById(1);
    res.status(200).json({
      success: true,
      categories: siteInfo ? siteInfo.categories : [],
    });
  }
);

//get all products
export const getAllProducts = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, page, limit, minPrice, maxPrice, category, rating, sort } =
      req.query;

    //check for request query types
    if (name && typeof name !== "string")
      return next(ApiError.wrongType(`${name} is not of the type String`));
    if (page && typeof page !== "string")
      return next(ApiError.wrongType(`${page} is not of the type String`));
    if (limit && typeof limit !== "string")
      return next(ApiError.wrongType(`${limit} is not of the type String`));
    if (minPrice && typeof minPrice !== "string")
      return next(ApiError.wrongType(`${minPrice} is not of the type String`));
    if (maxPrice && typeof maxPrice !== "string")
      return next(ApiError.wrongType(`${maxPrice} is not of the type String`));
    if (category && typeof category !== "string")
      return next(ApiError.wrongType(`${category} is not of the type String`));
    if (rating && typeof rating !== "string")
      return next(ApiError.wrongType(`${rating} is not of the type String`));
    if (sort && typeof sort !== "string")
      return next(ApiError.wrongType(`${sort} is not of the type String`));

    //pagination variables
    const pageIndex = page ? parseInt(page) : 0;
    const limitNum = limit ? parseInt(limit) : 10;
    const skip = pageIndex * limitNum;

    //initial mongodb query
    let query: {
      $and: any[];
    } = { $and: [] };

    //Initial sort query
    let sortQuery = {};

    //querys variables
    const minPriceNum = minPrice && parseInt(minPrice);
    const maxPriceNum = maxPrice && parseInt(maxPrice);
    const ratingNum = rating && parseInt(rating);

    if (name) query.$and.push({ name: new RegExp(name, "i") });
    if (category) query.$and.push({ category: category });
    if (minPrice) query.$and.push({ price: { $gte: minPriceNum } });
    if (maxPrice) query.$and.push({ price: { $lte: maxPriceNum } });
    if (rating) query.$and.push({ rating: { $gte: ratingNum } });

    switch (sort) {
      case "priceL>H":
        sortQuery = { price: 1 } as MongooseQueryOptions;
        break;
      case "priceH>L":
        sortQuery = { price: -1 } as MongooseQueryOptions;
        break;
      case "review":
        sortQuery = { review: -1 } as MongooseQueryOptions;
        break;
      case "newest":
        sortQuery = { createdAt: -1 } as MongooseQueryOptions;
        break;

      default:
        sortQuery = { createdAt: -1 } as MongooseQueryOptions;
        break;
    }

    //check if there is any query
    const mongoQuery = query.$and.length > 0 ? query : {};

    const products = await productModel
      .find(mongoQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum);

    if (!products.length) {
      return next(ApiError.badRequest("No Products Were Found"));
    }

    const mostExpensiveProduct = await productModel
      .find()
      .sort({ price: -1 })
      .limit(1);

    const totalProducts = await productModel.count();

    const nextPage =
      totalProducts - (pageIndex + 1) * limitNum > 0 ? pageIndex + 2 : null;

    const siteInfo = await siteInfoModel.findById(1);

    res.status(200).json({
      success: true,
      products,
      page: pageIndex + 1,
      nextPage,
      highestPrice: mostExpensiveProduct[0].price || 0,
      categories: siteInfo?.categories,
    });
  }
);

//------------------- AUTHNTICATED USERs -------------------//

// update stock
export const updateProductStock = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body.forEach(async (element: { id: string; quantity: number }) => {
      const product = await productModel.findByIdAndUpdate(element.id, {
        $inc: { stock: element.quantity },
      });
      console.log("products", product);
      if (!product) {
        return next(ApiError.badRequest("Product not found"));
      }
    });

    res
      .status(200)
      .json({ success: true, message: "Products Updated successfully" });
  }
);

//create a review
export const createReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rating, comment, productId } = req.body;

    //check for rating and comment input
    if (!rating || !comment)
      return next(ApiError.badRequest("Please input the rating and comment"));

    const review = {
      id: new Types.ObjectId(),
      user: res.locals.user._id,
      name: res.locals.user.name,
      rating,
      comment,
    };

    const product = await productModel.findById(productId);

    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === res.locals.user._id
    );

    if (alreadyReviewed) {
      product.reviews.find((rev) => {
        if (rev.id === alreadyReviewed.id) {
          rev.comment = comment;
          rev.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let average = 0;
    product.reviews.forEach((rev) => (average += rev.rating));
    product.rating = average / product.reviews.length;

    //save changes
    product.save({ validateBeforeSave: true });

    res.status(200).json({ success: true, product });
  }
);

//delete a review
export const deleteReview = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productModel.findById(req.body.productId);

    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }

    const reviews = product.reviews.filter(
      (rev) => rev.id.toString() === req.body.reviewId
    );

    let average = 0;
    reviews.forEach((rev) => (average += rev.rating));
    const rating = average / reviews.length;
    const numOfReviews = reviews.length;

    const response = await productModel.findByIdAndUpdate(
      req.body.productId,
      {
        reviews,
        rating,
        numOfReviews,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, response });
  }
);
