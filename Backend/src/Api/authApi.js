import { auth } from "../utils/auth";
 
const response = await auth.api.signInEmail({
    body: {
        email,
        password
    },
    asResponse: true // returns a response object instead of data
});


