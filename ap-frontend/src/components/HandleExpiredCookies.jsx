function HandleExpiredCookies(response) {
  if (response.status === 401) {
    window.location.href = '/login'
    return true
  }

  return false
}

export default HandleExpiredCookies
