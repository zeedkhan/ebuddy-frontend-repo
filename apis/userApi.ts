import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const ROUTES = {
    fetchUsers: baseURL + "/fetch-user-data",
    updateUser: baseURL + "/update-user-data"
}

const fetchUsers = async (token: string) => {
    try {
        const request = await axios.get(ROUTES.fetchUsers, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return request.data
    } catch (err) {
        throw err
    }
};

const updateUserCollection = async (token: string, uid: string) => {
    const payload = {
        uid: uid || "",
    }
    try {
        const request = await axios.put(ROUTES.updateUser, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return request.data
    } catch (err) {
        throw err
    }
};


export {
    fetchUsers,
    updateUserCollection
}