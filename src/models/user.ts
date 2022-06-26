interface IUSer {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword: string
  referrerID: string
}

import mongoose from 'mongoose'
const { nanoid } = require('nanoid')
const ObjectId = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
    //   required: true
    },
    password: {
      type: String,
      required: true
    },
    referrerID: {
      type: String,
      required: true
    },
    verificationSession: {
        type: Object,
        // required: true
      }
    // entries: [{
    //     type: ObjectId,
    //     ref: "Entry",
    //   }],
  },
  {
    timestamps: true
  }
)
const User = mongoose.model('Users', userSchema)



// userSchema.pre('save', async function (next: any) {
//   if (this.isNew) {
//     if (!this.trackingId) {
//       this.trackingId = `${TRACKING_PREFIX.SHIPMENT}${nanoid(8)}`
//     } else {
//       this.trackingId = `${TRACKING_PREFIX.SHIPMENT}${this.trackingId}`
//     }
//   }
//   next()
// })
export default User 