import axios from "axios";

const authentic = {};

authentic.login = async (url, body, cb = f => f) => {
    console.log(url, "url from auth")
    try {
        let { data, status } = await axios.post(url, body)

        if (status == 200) {
            cb(data)
            console.log(data, "data")
        }
        else {
            console.log("not working")
        }

    } catch (error) {
        console.log(error, "error from auth")
    }
}

authentic.register = async (url, body, rd = f => f) => {
    console.log(url, "url from auth")
    try {
        let { data, status } = await axios.post(url, body)

        if (status == 200) {
            rd(data)
            console.log(data, "data")
        }
        else {
            console.log("not working")
        }

    } catch (error) {
        console.log(error, "error from auth")
    }
}

export default authentic;