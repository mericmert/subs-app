
declare module "user-types" {

    export interface Profile {
        username: String,
        profile : {
            fullName?: String,
            bio?: String,
            imageUrl?: String
        }
       
    }

    export interface Post {
        text_content? : String,
        imageUrl? : String,
        date : String,
        author : {
            username : String
            profile : {
                imageUrl: String,
                fullName: String                
            }
        }
    }
}
