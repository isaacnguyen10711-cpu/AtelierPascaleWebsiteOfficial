import GetUserToken from './GetUserToken'
import PopUpDialog from './PopUpDialog'

async function GetUserRole() {
  const response = await fetch(`https://localhost:7215/api/authentication/getUserRole`,
    {
      credentials: 'include',
    });

  if (!response.ok) {
    return null;
  }

  // Return the role from the response
  const data = await response.json();
  return data.role;
}

export default GetUserRole
