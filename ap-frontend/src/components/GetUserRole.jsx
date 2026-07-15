function GetUserRole() {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]))

  return decodedToken.role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

}

export default GetUserRole
