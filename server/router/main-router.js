import RouterExp from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import ObjectController from "../controllers/object-controller.js";
import PhotosObjectController from "../controllers/photos-object-controller.js";
import NumberController from "../controllers/number-controller.js";
import PhotosNumberController from "../controllers/photos-number-controller.js";
import CategoryController from "../controllers/category-controller.js";
import BookingController from "../controllers/booking-controller.js";
import UserYookingController from "../controllers/user-yooking-controller.js";
import FavoritesController from "../controllers/favorites-controller.js";
import RatingController from "../controllers/rating-controller.js";
import SettingPageController from "../controllers/setting-page-controller.js";
const Router = RouterExp.Router
const mainRoute = new Router()

//USERS YOOKING
mainRoute.get("/user/yooking", authMiddleware, UserYookingController.getAllUsersYooking)
mainRoute.get("/user/get_by_id/:userId", authMiddleware, UserYookingController.getUserYooking)
mainRoute.put("/user/yooking/:userId", authMiddleware, UserYookingController.updateUserYooking)
mainRoute.put("/user/yooking/code/:userId", authMiddleware, UserYookingController.generateCode)
mainRoute.delete("/user/yooking/:userId", authMiddleware, UserYookingController.deleteUserYooking)
//NUMBER
mainRoute.get('/numbers/:hotelId', NumberController.getAllNumbers);
mainRoute.post('/numbers/hotels', NumberController.getAllHotelIdNumbers);
mainRoute.get('/number_one/:numberId',  NumberController.getNumberById);
mainRoute.post('/numbers', authMiddleware, NumberController.createNumber);
mainRoute.put('/numbers/:numberId', authMiddleware, NumberController.updateNumber);
mainRoute.post('/numbers/:numberId', authMiddleware, NumberController.deleteNumberById);
mainRoute.delete('/numbers/:id', authMiddleware, NumberController.deleteNumbersByLastCategory);
mainRoute.delete('/numbers/:categoryId', authMiddleware, NumberController.deleteAllNumbersByCategory);
mainRoute.delete('/numbers/:hotelId', authMiddleware, NumberController.deleteAllNumberByObject);
//OBJECT
mainRoute.get("/",  ObjectController.getAllObject)
mainRoute.get("/object/:hotelId",  ObjectController.getObject)
mainRoute.get("/:userId",  ObjectController.getObjectByUserId)
mainRoute.post("/", ObjectController.searchObject)
mainRoute.put("/object/:hotelId", authMiddleware, ObjectController.updateObject)
mainRoute.delete("/object/:hotelId", authMiddleware, ObjectController.deleteObject)
//OBJECT PHOTOS
mainRoute.get("/by_hotelId/:hotelId", PhotosObjectController.getAllPhotosObject);
mainRoute.post('/object/photos', authMiddleware, PhotosObjectController.createPhotoObject);
mainRoute.delete('/object/photo/:idImg', authMiddleware, PhotosObjectController.deletePhotoObject);
mainRoute.delete('/object/photos/:hotelId', authMiddleware, PhotosObjectController.deleteAllPhotosObject);
//NUMBER PHOTOS
mainRoute.get('/numbers/photos/:categoryId',  PhotosNumberController.getAllPhotosCategoryNumber);
mainRoute.get('/number/photos/:numberId',  PhotosNumberController.getAllPhotosNumber);
mainRoute.post('/number/photos', authMiddleware, PhotosNumberController.createNumberPhotos);
mainRoute.delete('/number/photo/:idImg', authMiddleware, PhotosNumberController.deleteNumberPhoto);
mainRoute.delete('/number/photos/:numberId', authMiddleware, PhotosNumberController.deleteAllNumberPhotos);
mainRoute.delete('/number/photos/:categoryId', authMiddleware, PhotosNumberController.deleteAllCategoryNumberPhotos);
mainRoute.delete('/number/photos/:hotelId', authMiddleware, PhotosNumberController.deleteAllObjectNumberPhotos);

//CATEGORY
mainRoute.get('/categories/:hotelId',  CategoryController.getAllCategoryNumber);
mainRoute.get('/category/:categoryId',  CategoryController.getOneCategoryNumber);
mainRoute.post('/category', authMiddleware, CategoryController.createCategoryNumber);
mainRoute.put('/category/sale/:categoryId', authMiddleware, CategoryController.updateCategory);
mainRoute.put('/add__del/:categoryId', authMiddleware, CategoryController.updateCategoryNumber);
mainRoute.put('/category/:categoryLimitId', authMiddleware, CategoryController.updateCategoryNumberLimit);
mainRoute.delete('/category/:categoryId', authMiddleware, CategoryController.deleteCategoryNumber);
mainRoute.delete('/categories/:hotelId', authMiddleware, CategoryController.deleteAllCategoryNumber);
//BOOKING
mainRoute.get('/',  BookingController.getAllBooking);
mainRoute.get('/bookings/by_object/:hotelId', BookingController.getAllBookingByObject);
mainRoute.get('/booking/:id', BookingController.getBooking);
mainRoute.post('/booking', authMiddleware, BookingController.createBooking);
mainRoute.put('/booking/:id', authMiddleware, BookingController.updateBooking);
mainRoute.post('/booking/delete/:id', authMiddleware, BookingController.deleteBooking);

//FAVORITE
mainRoute.get('/get/:userId', authMiddleware, FavoritesController.getAllFavorites);
mainRoute.post('/add', authMiddleware, FavoritesController.createFavorite);
mainRoute.delete('/delete/:hotelId', authMiddleware, FavoritesController.deleteFavorite);
//RATING
mainRoute.get('/rating/:hotelId', RatingController.getAllRatingObject);
mainRoute.get('/rating/city/:city', RatingController.getAllCityRatingObject);
mainRoute.post('/rating', authMiddleware, RatingController.createRatingObject);
//SETTING PAGE
mainRoute.get('/setting_page/all', SettingPageController.getSettingPage);
export default mainRoute;