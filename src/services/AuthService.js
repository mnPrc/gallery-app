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
    
    getAllUsers = async () => {
        const { data } = await this.client.get('/admin/users');

        return data;
    }

    manageAdminPrivileges = async (user_id) => {
        const { data } = await this.client.post(`/admin/users/${user_id}`);

        return data;
    }

    depositMoney = async (money) => {
        const { data } = await this.client.post('/deposit', {money});
        
        return data;
    }

    handleToken = async () => {
        const tokenExpiry = localStorage.getItem('tokenExpiry');
        if (!tokenExpiry || new Date(tokenExpiry) <= new Date()) {
            try {
                const response = await axios.get('/refresh');
                const { token } = response.data;
                localStorage.setItem('token', token);

                const newTokenExpiry = new Date();
                newTokenExpiry.setMinutes(newTokenExpiry.getMinutes() + 60);
                localStorage.setItem('tokenExpiry', newTokenExpiry);
            } catch (error) {
                console.error('Failed to refresh token:', error);
            } 
        }   
    }
}

const authService = new AuthService();
export default authService;