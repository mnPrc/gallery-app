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
        const { data } = await this.client.post('/refresh');
        const { token } = data;
        
        localStorage.setItem('token', token);
        alert('Your token has been refreshed');
    }
}

const authService = new AuthService();
export default authService;