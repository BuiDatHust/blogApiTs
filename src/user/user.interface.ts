interface User {
    _id: string ,
    firstname: string, 
    lastname: string,
    email: string ,
    password: string,
    adress?: {
        street: string,
        city: string,
        country: string ,
    }
}



export default User