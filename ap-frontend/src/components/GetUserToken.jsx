import { jwtDecode } from 'jwt-decode' 
function GetUserToken() {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  const decodedToken = jwtDecode(token)
  // Convert to milliseconds
  const expirationTime = decodedToken.exp * 1000

  if (Date.now() >= expirationTime) {
    localStorage.removeItem('token')
    return null
  }

  return decodedToken

}

export default GetUserToken
