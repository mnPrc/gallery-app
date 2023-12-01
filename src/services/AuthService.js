import HttpService from "./HttpService";

class AuthService extends HttpService {

    login = async (credentials) => {
        const { data } = await this.client.post("login", credentials);
        const { token } = data;
    
        localStorage.setItem('token', token);
        return data;
    };

    register = async (newUser) => {
        const { data } = await this.client.post('register', newUser);
        const { token } = data;

        localStorage.setItem('token', token);
        return data;
    };

    logout = async () => {
        await this.client.post('logout');
        
        localStorage.removeItem('token');
    };

    getMyProfile = async () => {
        const { data } = await this.client.get('my-profile');

        return data;
    }

    handleToken = async () => {
        let token = localStorage.getItem('token');
        let decodedToken = atob(token.split('.')[1]);

        let currentDate = new Date();

        if (decodedToken.exp * 1000 < currentDate.getTime()){
                console.log('Token expired');
                this.client.post('refresh');
            } else {
                console.log('Valid token');
            }
    }
}

export default new AuthService();