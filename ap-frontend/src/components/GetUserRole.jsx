import GetUserToken from './GetUserToken'
function GetUserRole() {
  const decodedToken = GetUserToken()

  return decodedToken.role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

}

export default GetUserRole
