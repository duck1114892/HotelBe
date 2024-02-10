export const ADMIN_ROLE = "SUPER_ADMIN";
export const USER_ROLE = "NORMAL_USER";

export const INIT_PERMISSIONS = [
    {
        "_id": "648ab415f4328bd3153ee219",
        "name": "refresh token",
        "apiPath": "/api/v1/auth/account",
        "method": "GET",
        "module": "AUTH",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:47:49.369Z",
        "updatedAt": "2023-06-15T06:54:05.131Z",
        "__v": 0,
        "updatedBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        }
    },
    {
        "_id": "648ab415f4328bd3153ee217",
        "name": "refresh token",
        "apiPath": "/api/v1/auth/refresh",
        "method": "GET",
        "module": "AUTH",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:47:49.369Z",
        "updatedAt": "2023-06-15T06:54:05.131Z",
        "__v": 0,
        "updatedBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        }
    },


    {
        "_id": "648ab415f4328bd3153ee211",
        "name": "Get Hotel with paginate",
        "apiPath": "/api/v1/hotel",
        "method": "GET",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:47:49.369Z",
        "updatedAt": "2023-06-15T06:54:05.131Z",
        "__v": 0,
        "updatedBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        }
    },
    {
        "_id": "648ab436f4328bd3153ee216",
        "name": "Create Hotel",
        "apiPath": "/api/v1/hotel",
        "method": "POST",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:48:22.224Z",
        "updatedAt": "2023-06-15T06:48:22.224Z",
        "__v": 0
    },
    {
        "_id": "648ab436f4328bd3153ee217",
        "name": "Create Hotel With Hotel Admin",
        "apiPath": "/api/v1/hotel/create",
        "method": "POST",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-24T06:48:22.224Z",
        "updatedAt": "2023-06-24T06:48:22.224Z",
        "__v": 0
    },
    {
        "_id": "648ab4d5f4328bd3153ee21b",
        "name": "Update Hotel",
        "apiPath": "/api/v1/hotel/:id",
        "method": "PATCH",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:51:01.241Z",
        "updatedAt": "2023-06-15T06:51:01.241Z",
        "__v": 0
    },
    {
        "_id": "648ab4d5f4328bd3153ee21a",
        "name": "Update Hotel",
        "apiPath": "/api/v1/hotel/update",
        "method": "PATCH",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:51:01.241Z",
        "updatedAt": "2023-06-15T06:51:01.241Z",
        "__v": 0
    },
    {
        "_id": "648ab4d5f4328bd3153ee211",
        "name": "Update Hotel",
        "apiPath": "/api/v1/hotel/updateRoomId/:id",
        "method": "PATCH",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:51:01.241Z",
        "updatedAt": "2023-06-15T06:51:01.241Z",
        "__v": 0
    },
    {
        "_id": "648ab4ebf4328bd3153ee220",
        "name": "Delete Hotel",
        "apiPath": "/api/v1/hotel/:id",
        "method": "DELETE",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:51:23.973Z",
        "updatedAt": "2023-06-15T06:51:23.973Z",
        "__v": 0
    },
    {
        "_id": "648ab4ebf4328bd3153ee221",
        "name": "Delete Hotel",
        "apiPath": "/api/v1/hotel/remove",
        "method": "DELETE",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:51:23.973Z",
        "updatedAt": "2023-06-15T06:51:23.973Z",
        "__v": 0
    },
    {
        "_id": "648ab5a8072f2a2ef910638d",
        "name": "Get Hotel by id",
        "apiPath": "/api/v1/hotel/:id",
        "method": "GET",
        "module": "HOTELS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:54:32.799Z",
        "updatedAt": "2023-06-15T06:54:32.799Z",
        "__v": 0
    },
    {
        "_id": "648ab6d3fa16b294212e4033",
        "name": "Create User",
        "apiPath": "/api/v1/users",
        "method": "POST",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "_id": "648ab6e7fa16b294212e4038",
        "name": "Get User by Id",
        "apiPath": "/api/v1/users/:id",
        "method": "GET",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:51.041Z",
        "updatedAt": "2023-06-15T06:59:51.041Z",
        "__v": 0
    },
    {
        "_id": "648ab6fdfa16b294212e403d",
        "name": "Get User with paginate",
        "apiPath": "/api/v1/users",
        "method": "GET",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:13.364Z",
        "updatedAt": "2023-06-15T07:00:13.364Z",
        "__v": 0
    },
    {
        "_id": "648ab719fa16b294212e4042",
        "name": "Update User",
        "apiPath": "/api/v1/users/:id",
        "method": "PATCH",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:41.934Z",
        "updatedAt": "2023-06-15T07:00:41.934Z",
        "__v": 0
    },
    {
        "_id": "648ab728fa16b294212e4047",
        "name": "Delete User",
        "apiPath": "/api/v1/users/:id",
        "method": "DELETE",
        "module": "USERS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:56.274Z",
        "updatedAt": "2023-06-15T07:00:56.274Z",
        "__v": 0
    },
    {
        "_id": "648ab750fa16b294212e404c",
        "name": "Upload Single File",
        "apiPath": "/api/v1/files/upload",
        "method": "POST",
        "module": "FILES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:01:36.923Z",
        "updatedAt": "2023-06-15T07:01:36.923Z",
        "__v": 0
    },
    {
        "_id": "648ad488dafdb9754f40b846",
        "name": "Create a Room",
        "apiPath": "/api/v1/room",
        "method": "POST",
        "module": "ROOMS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:06:16.508Z",
        "updatedAt": "2023-06-15T09:06:16.508Z",
        "__v": 0
    },
    {
        "_id": "648ad488dafdb9754f40b847",
        "name": "Create a Room With Hotels Admin",
        "apiPath": "/api/v1/room/create",
        "method": "POST",
        "module": "ROOMS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:06:16.508Z",
        "updatedAt": "2023-06-15T09:06:16.508Z",
        "__v": 0
    },

    {
        "_id": "648ad499dafdb9754f40b84b",
        "name": "Get a room by id",
        "apiPath": "/api/v1/room/:id",
        "method": "GET",
        "module": "ROOMS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:06:33.697Z",
        "updatedAt": "2023-06-15T09:06:33.697Z",
        "__v": 0
    },
    {
        "_id": "648ad4a6dafdb9754f40b850",
        "name": "Update a Room",
        "apiPath": "/api/v1/room/:id",
        "method": "PATCH",
        "module": "ROOMS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:06:46.085Z",
        "updatedAt": "2023-06-15T09:06:46.085Z",
        "__v": 0
    },
    {
        "_id": "648ad4ccdafdb9754f40b859",
        "name": "Get room with paginate",
        "apiPath": "/api/v1/room",
        "method": "GET",
        "module": "ROOMS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:07:24.175Z",
        "updatedAt": "2023-06-15T09:07:24.175Z",
        "__v": 0
    },
    {
        "_id": "648ad4d9dafdb9754f40b85e",
        "name": "Delete a Room",
        "apiPath": "/api/v1/room/:id",
        "method": "DELETE",
        "module": "ROOMS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:07:37.896Z",
        "updatedAt": "2023-06-15T09:07:37.896Z",
        "__v": 0
    },
    {
        "_id": "648ad4fedafdb9754f40b863",
        "name": "Create a Booking",
        "apiPath": "/api/v1/booking",
        "method": "POST",
        "module": "BOOKINGS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:08:14.659Z",
        "updatedAt": "2023-06-15T09:08:14.659Z",
        "__v": 0
    },
    {
        "_id": "648ad511dafdb9754f40b868",
        "name": "Fetch booking with paginate",
        "apiPath": "/api/v1/booking",
        "method": "GET",
        "module": "BOOKINGS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:08:33.395Z",
        "updatedAt": "2023-06-15T09:08:33.395Z",
        "__v": 0
    },
    {
        "_id": "648ad522dafdb9754f40b86d",
        "name": "Get booking by id",
        "apiPath": "/api/v1/booking/:id",
        "method": "GET",
        "module": "BOOKINGS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:08:50.801Z",
        "updatedAt": "2023-06-15T09:08:50.801Z",
        "__v": 0
    },
    {
        "_id": "648ad53bdafdb9754f40b872",
        "name": "Delete a booking",
        "apiPath": "/api/v1/booking/:id",
        "method": "DELETE",
        "module": "BOOKINGS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:09:15.785Z",
        "updatedAt": "2023-06-15T09:09:15.785Z",
        "__v": 0
    },
    {
        "_id": "648ad555dafdb9754f40b877",
        "name": "Update booking status",
        "apiPath": "/api/v1/booking/:id",
        "method": "PATCH",
        "module": "BOOKINGS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:09:41.694Z",
        "updatedAt": "2023-06-15T09:09:41.694Z",
        "__v": 0
    },
    {
        "_id": "648ad56ddafdb9754f40b87c",
        "name": "Fetch booking by user",
        "apiPath": "/api/v1/booking/by",
        "method": "POST",
        "module": "BOOKINGS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:05.961Z",
        "updatedAt": "2023-06-15T09:10:05.961Z",
        "__v": 0
    },
    {
        "_id": "648ad59adafdb9754f40b881",
        "name": "Create a permission",
        "apiPath": "/api/v1/permissions",
        "method": "POST",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "648ad5aedafdb9754f40b886",
        "name": "Fetch Permission with paginate",
        "apiPath": "/api/v1/permissions",
        "method": "GET",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:10.914Z",
        "updatedAt": "2023-06-15T09:11:10.914Z",
        "__v": 0
    },
    {
        "_id": "648ad5c5dafdb9754f40b88b",
        "name": "Fetch permission by id",
        "apiPath": "/api/v1/permissions/:id",
        "method": "GET",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:33.234Z",
        "updatedAt": "2023-06-15T09:11:33.234Z",
        "__v": 0
    },
    {
        "_id": "648ad5d4dafdb9754f40b890",
        "name": "Update a permission",
        "apiPath": "/api/v1/permissions/:id",
        "method": "PATCH",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:48.081Z",
        "updatedAt": "2023-06-15T09:11:48.081Z",
        "__v": 0
    },
    {
        "_id": "648ad5ebdafdb9754f40b895",
        "name": "Delete a permission",
        "apiPath": "/api/v1/permissions/:id",
        "method": "DELETE",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:11.323Z",
        "updatedAt": "2023-06-15T09:12:11.323Z",
        "__v": 0
    },
    {
        "_id": "648ad613dafdb9754f40b89a",
        "name": "Create Role",
        "apiPath": "/api/v1/roles",
        "method": "POST",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "648ad622dafdb9754f40b89f",
        "name": "Fetch roles with paginate",
        "apiPath": "/api/v1/roles",
        "method": "GET",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:06.618Z",
        "updatedAt": "2023-06-15T09:13:06.618Z",
        "__v": 0
    },
    {
        "_id": "648ad630dafdb9754f40b8a6",
        "name": "Fetch role by id",
        "apiPath": "/api/v1/roles/:id",
        "method": "GET",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:20.853Z",
        "updatedAt": "2023-06-15T09:13:20.853Z",
        "__v": 0
    },
    {
        "_id": "648ad640dafdb9754f40b8ab",
        "name": "Update Role",
        "apiPath": "/api/v1/roles/:id",
        "method": "PATCH",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:36.836Z",
        "updatedAt": "2023-06-15T09:13:36.836Z",
        "__v": 0
    },
    {
        "_id": "648ad650dafdb9754f40b8b0",
        "name": "Delete a Role",
        "apiPath": "/api/v1/roles/:id",
        "method": "DELETE",
        "module": "ROLES",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:52.798Z",
        "updatedAt": "2023-06-15T09:13:52.798Z",
        "__v": 0
    },
    {
        "_id": "648ad650dafdb9754f40b8b1",
        "name": "create comment",
        "apiPath": "/api/v1/rating",
        "method": "POST",
        "module": "RATING",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:52.798Z",
        "updatedAt": "2023-06-15T09:13:52.798Z",
        "__v": 0
    },
    {
        "_id": "648ad650dafdb9754f40b8b2",
        "name": "create comment",
        "apiPath": "/api/v1/rating/:id",
        "method": "GET",
        "module": "RATING",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:52.798Z",
        "updatedAt": "2023-06-15T09:13:52.798Z",
        "__v": 0
    },
    {
        "_id": "648ad650dafdb9754f40b8b5",
        "name": "LogOut",
        "apiPath": "/api/v1/auth/logout",
        "method": "POST",
        "module": "AUTHusers",
        "createdBy": {
            "_id": "647b5108a8a243e8191855b5",
            "email": "hoidanit@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:52.798Z",
        "updatedAt": "2023-06-15T09:13:52.798Z",
        "__v": 0
    }
]





