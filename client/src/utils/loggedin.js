import { loggedinApi } from "../services/api.services"

const isLoggedIn = async () => {
    const username = localStorage.getItem('quizuser')
    const token = localStorage.getItem('quizusertoken')
    if (username && token) {
        try {
            const response = await loggedinApi({
                params: {
                    username, token
                }
            })
            return response.loggedin
        }
        catch (error) {
            console.error("Error occured : ", error);
        }
    }
}

export default isLoggedIn