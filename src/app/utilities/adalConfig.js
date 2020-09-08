import { AuthenticationContext } from 'react-adal';
import * as jwt from 'jsonwebtoken';

const adalConfig = {
    tenant: '71207f6e-8e1c-42fd-a191-00b95bf952f0',
    clientId: 'b01562d4-c036-4c46-ab1e-b3b79c3ede6f',
    redirectUri: 'https://offerassistantclient.z5.web.core.windows.net/',
    localLoginUrl: '/',
    cacheLocation: 'localStorage'
};

export const authContext = new AuthenticationContext(adalConfig);
export const getToken = () => authContext.getCachedToken(adalConfig.clientId);
export const userLogout = () => authContext.logOut();

export const getUser = () => {
    const token = jwt.decode(getToken());
    let isAdmin, isSupervisor, isExec

    const name = token.name;
    if(token.roles){
      isAdmin = token.roles.includes('Admin')
      isSupervisor = token.roles.includes('Supervisor')
      isExec = token.roles.includes('Exec')
    }

    return {
      name: name,
      isAdmin: isAdmin, 
      isSupervisor: isSupervisor, 
      isExec: isExec
    }; 
}