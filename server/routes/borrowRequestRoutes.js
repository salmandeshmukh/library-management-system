const express = require('express')

const {
  createBorrowRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
  getMyRequests,
} = require(
  '../controllers/borrowRequestController'
)

const {
  protect,
} = require(
  '../middleware/authMiddleware'
)

const {
  adminOnly,
} = require(
  '../middleware/adminMiddleware'
)

const router = express.Router()

router.post(
  '/',
  protect,
  createBorrowRequest
)

router.get(
  '/',
  protect,
  adminOnly,
  getAllRequests
)

router.put(
  '/approve/:id',
  protect,
  adminOnly,
  approveRequest
)

router.put(
  '/reject/:id',
  protect,
  adminOnly,
  rejectRequest
)

router.get(
  "/my-requests",

  protect,

  getMyRequests
);

module.exports = router