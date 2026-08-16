function HandleExpiredCookies(response) {
  if (response.status === 401) {
    return true
  }

  return false

}


export default HandleExpiredCookies
